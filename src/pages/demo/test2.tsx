import React, { useRef, useCallback } from "react";
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
} from "reactflow";

import Sidebar from "./Sidebar";
import TurboInputNode, { TurboNodeData } from "./InputNode";
import TurboOutputNode from "./OutputNode";
import DefaultNode from "./DefaultNode";
import TurboEdge from "./TurboEdge";
import FloatingEdge from "./FloatingEdge";
import FunctionIcon from "./FunctionIcon";

const initialNodes: Node<TurboNodeData>[] = [
    {
        id: "r-1",
        position: { x: 0, y: 0 },
        type: "input",
        data: { icon: <FunctionIcon />, title: "readFile", desc: "api.ts" },
    },
    {
        id: "r-2",
        position: { x: 250, y: 0 },
        type: "default",
        data: { title: "bundle", desc: "apiContents" },
    },
    {
        id: "r-3",
        position: { x: 0, y: 250 },
        type: "input",
        data: { title: "readFile", desc: "sdk.ts" },
    },
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

    return (
        <div className="dndflow" style={{ height: "70vh" }}>
            <Sidebar />
            <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                <ReactFlow
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
                >
                    <Controls />
                </ReactFlow>
            </div>
        </div>
    );
};

export default () => (
    <ReactFlowProvider>
        <DnDFlow />
    </ReactFlowProvider>
);
