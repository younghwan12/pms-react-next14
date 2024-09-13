import React, { useCallback, useRef, useState } from "react";
import ReactFlow, {
    Controls,
    useNodesState,
    useEdgesState,
    addEdge,
    Node,
    Edge,
    ReactFlowProvider,
    Background,
    BackgroundVariant,
    ReactFlowInstance,
    useReactFlow,
} from "reactflow";

import "reactflow/dist/base.css";
import TurboNode, { TurboNodeData } from "./InputNode";
import TurboEdge from "./TurboEdge";
import FunctionIcon from "./FunctionIcon";

const initialNodes: Node<TurboNodeData>[] = [
    {
        id: "1",
        position: { x: 0, y: 0 },
        data: { title: "readFile", subline: "api.ts" },
        type: "turbo",
    },
    {
        id: "2",
        position: { x: 250, y: 0 },
        data: { title: "bundle", subline: "apiContents" },
        type: "turbo",
    },
    {
        id: "3",
        position: { x: 0, y: 250 },
        data: { title: "readFile", subline: "sdk.ts" },
        type: "turbo",
    },
    {
        id: "4",
        position: { x: 250, y: 250 },
        data: { title: "bundle", subline: "sdkContents" },
        type: "turbo",
    },
    {
        id: "5",
        position: { x: 500, y: 125 },
        data: { title: "concat", subline: "api, sdk" },
        type: "turbo",
    },
    {
        id: "6",
        position: { x: 750, y: 125 },
        data: { title: "fullBundle" },
        type: "turbo",
    },
];

const initialEdges: Edge[] = [
    {
        id: "e1-2",
        source: "1",
        target: "2",
    },
    {
        id: "e3-4",
        source: "3",
        target: "4",
    },
    {
        id: "e2-5",
        source: "2",
        target: "5",
    },
    {
        id: "e4-5",
        source: "4",
        target: "5",
    },
    {
        id: "e5-6",
        source: "5",
        target: "6",
    },
];

const nodeTypes = {
    turbo: TurboNode,
};

const edgeTypes = {
    turbo: TurboEdge,
};

const defaultEdgeOptions = {
    type: "turbo",
    markerEnd: "edge-circle",
};

const Flow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

    const { screenToFlowPosition } = useReactFlow();

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
    const [leftItem, setLeftItem] = useState([
        {
            id: "1",
            name: "시작",
            type: "등록",
            color: "#ff5f99",
        },
        {
            id: "2",
            name: "중간1",
            // type: "중간1",
            color: "#98c220",
        },
        {
            id: "3",
            name: "중간2",
            // type: "중간",
            color: "#3598fe",
        },
        {
            id: "4",
            name: "종료",
            type: "종료",
            color: "#888",
        },
    ]);
    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDragStart = (event: any, nodeType: Node[], nodeId: string, nodeName: string, nodeColor: string) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.setData("application/nodeId", nodeId);
        event.dataTransfer.setData("application/nodeName", nodeName);
        event.dataTransfer.setData("application/nodeColor", nodeColor);
        event.dataTransfer.effectAllowed = "move";
    };

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const type = event.dataTransfer.getData("application/reactflow");

            if (typeof type === "undefined" || !type) {
                return;
            }

            const position = reactFlowInstance?.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode = {
                id: "1",
                type,
                position,
                data: { label: `${type} node` },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition]
    );

    return (
        <div className="dndflow" style={{ height: "70vh" }}>
            <aside
                style={{
                    position: "relative",
                    border: "1px solid #dee2e6",
                    marginRight: "5px",
                }}
            >
                <div className="description">List</div>
                {leftItem.length > 0 &&
                    leftItem.map((li, i) => {
                        let prop = "";
                        let propClass = "";
                        let color = li.color;

                        if (li.type === "등록") {
                            prop = "input";
                            propClass = "dndnode input";
                        } else if (li.type === "종료") {
                            prop = "output";
                            propClass = "dndnode output";
                        } else {
                            prop = "default";
                            propClass = "dndnode";
                        }

                        return (
                            <div
                                id={li.id}
                                key={li.id}
                                className={propClass}
                                onDragStart={(event) =>
                                    onDragStart(
                                        event,
                                        prop,
                                        event.currentTarget.id,
                                        event.currentTarget.innerText,
                                        color
                                    )
                                }
                                draggable
                            >
                                {li.name}
                            </div>
                        );
                    })}
            </aside>
            <div
                className="reactflow-wrapper"
                ref={reactFlowWrapper}
                style={{ border: "1px solid #dee2e6", padding: "3px" }}
            >
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDragOver={onDragOver}
                    // onInit={onInit}
                    // onNodeDragStop={onNodeDragStop}
                    // onNodeDrag={onNodeDrag}
                    onDrop={onDrop}
                    // onDragOver={onDragOver}
                    // onNodesDelete={onNodesDelete}
                    edgeTypes={edgeTypes}
                    defaultEdgeOptions={defaultEdgeOptions}
                    snapToGrid={true}
                    snapGrid={[25, 25]}
                    zoomOnScroll={false}
                    deleteKeyCode={["Delete", "BackSpace"]}
                    // fitView
                >
                    {/* <Background id="1" gap={10} color="#f1f1f1" variant={BackgroundVariant.Lines} />

                        <Background id="2" gap={100} color="#ccc" variant={BackgroundVariant.Lines} /> */}
                    <Controls />
                </ReactFlow>
            </div>
        </div>
    );
};

const FlowWithProvider = () => {
    return (
        <ReactFlowProvider>
            <Flow />
        </ReactFlowProvider>
    );
};

export default FlowWithProvider;
