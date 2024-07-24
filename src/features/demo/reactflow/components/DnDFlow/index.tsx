import React, { useRef, useCallback, useState } from "react";
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    useReactFlow,
    Node,
    Edge,
    MarkerType,
    Background,
} from "reactflow";

import Sidebar from "../Sidebar";
// import TurboOutputNode from "./OutputNode";
// import DefaultNode from "./DefaultNode";
// import TurboEdge from "./TurboEdge";
// import FloatingEdge from "./FloatingEdge";
// import FunctionIcon from "./FunctionIcon";

import TurboInputNode, { TurboNodeData } from "../nodes/InputNode";

import TurboOutputNode from "../nodes/OutputNode";
import DefaultNode from "../nodes/DefaultNode";
import TurboEdge from "../edges/TurboEdge";
import FloatingEdge from "../edges/FloatingEdge";
import FunctionIcon from "../nodes/FunctionIcon";
import { Button } from "primereact/button";
import ContextMenu from "../ContextMenu";

const initialNodes: Node<TurboNodeData>[] = [
    {
        id: "r-1",
        position: { x: 50, y: 50 },
        type: "input",
        data: { icon: <FunctionIcon />, title: "readFile", desc: "api.ts" },
    },
    {
        id: "r-2",
        position: { x: 250, y: 50 },
        type: "default",
        data: { title: "bundle", desc: "apiContents" },
    },
    // {
    //     id: "r-3",
    //     position: { x: 50, y: 250 },
    //     type: "input",
    //     data: { title: "readFile", desc: "sdk.ts" },
    // },
];

const initialEdges: Edge[] = [
    {
        id: "B->G",
        source: "r-1",
        target: "r-2",
    },
];

const nodeTypes = {
    input: TurboInputNode,
    default: DefaultNode,
    output: TurboOutputNode,
};

const edgeTypes = {
    floating: FloatingEdge,
    turbo: TurboEdge,
    // step: StepEdge,
};

const defaultEdgeOptions = {
    style: { strokeWidth: 2 },
    // type: "smoothstep",
    type: "step",
    markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        // color: "#FF0072",
    },
};

const DnDFlow = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [menu, setMenu] = useState<any>(null);
    const ref = useRef<HTMLDivElement>(null);
    const { screenToFlowPosition } = useReactFlow();

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();
            //const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData("application/reactflow");
            const nodeId = event.dataTransfer.getData("application/nodeId");
            const nodeName = event.dataTransfer.getData("application/nodeName");
            const nodeDesc = event.dataTransfer.getData("application/nodeDesc");
            const nodeColor = event.dataTransfer.getData("application/nodeColor");

            // check if the dropped element is valid
            if (typeof type === "undefined" || !type) {
                return;
            }

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            console.log("event", event);
            const newNode = {
                id: nodeId,
                type,
                position,
                data: { title: nodeName, desc: nodeDesc },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition]
    );

    const onNodeContextMenu = useCallback(
        (event, node) => {
            // Prevent native context menu from showing
            event.preventDefault();

            // Calculate position of the context menu. We want to make sure it
            // doesn't get positioned off-screen.
            if (ref.current) {
                const pane = ref.current?.getBoundingClientRect();
                setMenu({
                    id: node.id,
                    top: event.clientY < pane.height - 200 && event.clientY,
                    left: event.clientX < pane.width - 200 && event.clientX,
                    right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
                    bottom: event.clientY >= pane.height - 200 && pane.height - event.clientY,
                });
            }
        },
        [setMenu]
    );

    const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

    return (
        <>
            <Button label="데이터" onClick={() => console.log({ nodes: nodes, edge: edges })} />
            <div className="dndflow" style={{ height: "70vh" }}>
                <Sidebar />
                <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                    <ReactFlow
                        ref={ref}
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        edgeTypes={edgeTypes}
                        nodeTypes={nodeTypes}
                        defaultEdgeOptions={defaultEdgeOptions}
                        snapToGrid={true}
                        snapGrid={[25, 25]}
                        zoomOnScroll={false}
                        deleteKeyCode={["Delete", "BackSpace"]}
                        onPaneClick={onPaneClick}
                        onNodeContextMenu={onNodeContextMenu}
                    >
                        <Controls />
                        <Background />
                        {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
                    </ReactFlow>
                </div>
            </div>
        </>
    );
};

export default () => (
    <ReactFlowProvider>
        <DnDFlow />
    </ReactFlowProvider>
);
