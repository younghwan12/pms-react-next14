import FloatingEdge from "@/common/components/reactflow/FloatingEdge";
import { useAppDispatch } from "@/redux/hooks";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { useCallback, useRef, useState } from "react";
import ReactFlow, {
    Controls,
    MarkerType,
    Node,
    ReactFlowInstance,
    ReactFlowProvider,
    addEdge,
    getConnectedEdges,
    getIncomers,
    getOutgoers,
    useEdgesState,
    useNodesState,
} from "reactflow";

const ReactFlowContainer = () => {
    const dispatch = useAppDispatch();
    const toast = useRef<Toast>(null);
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

    const [visible, setVisible] = useState(false);

    const [datas, setDatas] = useState([]);
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
            type: "중간1",
            color: "#98c220",
        },
        {
            id: "3",
            name: "중간2",
            type: "중간",
            color: "#3598fe",
        },
        {
            id: "4",
            name: "종료",
            type: "종료",
            color: "#888",
        },
    ]);

    const onInit = (instance: ReactFlowInstance) => setReactFlowInstance(instance);

    const [target, setTarget] = useState(null);

    const onDragStart = (event: any, nodeType: Node[], nodeId: string, nodeName: string, nodeColor: string) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.setData("application/nodeId", nodeId);
        event.dataTransfer.setData("application/nodeName", nodeName);
        event.dataTransfer.setData("application/nodeColor", nodeColor);
        event.dataTransfer.effectAllowed = "move";
    };

    const onDragOver = useCallback((event: any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData("application/reactflow");
            const nodeId = event.dataTransfer.getData("application/nodeId");
            const nodeName = event.dataTransfer.getData("application/nodeName");
            const nodeColor = event.dataTransfer.getData("application/nodeColor");

            if (typeof type === "undefined" || !type) {
                return;
            }

            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            const newNode = {
                // ID, 이름 Drag 가져오는거
                id: `${nodeId}`,
                type: type || "default",
                position,
                className: "cicd",
                data: { label: `${nodeName}` },
                style: { backgroundColor: nodeColor },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance]
    );

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    const onNodeDrag = (evt, node) => {
        const centerX = node.position.x + node.width / 2;
        const centerY = node.position.y + node.height / 2;

        // find a node where the center point is inside
        const targetNode = nodes.find(
            (n) =>
                centerX > n.position.x &&
                centerX < n.position.x + n.width &&
                centerY > n.position.y &&
                centerY < n.position.y + n.height &&
                n.id !== node.id
        );

        setTarget(targetNode);
    };
    /*
    const onNodeDragStop = (event, node) => {
        const draggedNodeId = node.id;

        if (target && target.id !== draggedNodeId) {
            const newNodes = nodes.filter((n) => n.id !== draggedNodeId && n.id !== target.id);

            const newEdges = edges.filter(
                (e) =>
                    e.source !== draggedNodeId &&
                    e.target !== draggedNodeId &&
                    e.source !== target.id &&
                    e.target !== target.id
            );

            const newPosition = {
                x: (node.position.x + target.position.x) / 2,
                y: (node.position.y + target.position.y) / 2,
            };

            if (node?.data.stage !== target?.data.stage) {
                modal.warning({
                    title: "스테이지를 일치시켜주세요!",
                });
            }

            if (node?.type === target?.type) {
                const newNodeLabel = `${target.data.label} \n ${node.data.label}`;

                const newNode = {
                    id: `${target.id}` + `,` + `${node.id}`,
                    //id: "",
                    type: target.type,
                    className: target?.className,
                    style: target?.style,
                    position: newPosition,
                    data: {
                        label: newNodeLabel,
                    },
                };

                setNodes([...newNodes, newNode]);
                // }
            } else {
                console.log("error");
            }

            setEdges(newEdges);
        }
        setTarget(null);
    };
    */

    // 노드 삭제
    const onNodesDelete = useCallback(
        (deleted) => {
            setEdges(
                deleted.reduce((acc, node) => {
                    //setDeleteNode(node.id);

                    const incomers = getIncomers(node, nodes, edges);
                    const outgoers = getOutgoers(node, nodes, edges);
                    const connectedEdges = getConnectedEdges([node], edges);

                    const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge));

                    const createdEdges = incomers.flatMap(({ id: source }) =>
                        outgoers.map(({ id: target }) => ({
                            id: `reactflow${source}->${target}`,
                            source,
                            target,
                        }))
                    );

                    return [...remainingEdges, ...createdEdges];
                }, edges)
            );
        },
        [nodes, edges]
    );

    //FIXME 여기부터 수정해야함
    const onSave = useCallback(async () => {
        if (reactFlowInstance) {
            const flow = reactFlowInstance.toObject();

            console.log("flow", flow);
        }
    }, [reactFlowInstance]);

    const modalOnCancelFun = () => {
        setVisible(false);
        setNodes([]);
        setEdges([]);
    };

    const edgeTypes = {
        floating: FloatingEdge,
        // step: StepEdge,
    };

    const defaultEdgeOptions = {
        style: { strokeWidth: 4, stroke: "#b1b1b7" },
        type: "floating",
        // type: "step",
        markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "#b1b1b7",
        },
    };

    return (
        <>
            <Button label="WorkFlow" onClick={() => setVisible(true)} />
            <Toast ref={toast} />
            <Dialog
                header={"WorkFLow"}
                visible={visible}
                closable={true}
                onHide={modalOnCancelFun}
                footer={
                    <>
                        <Button label="삭제" icon="pi pi-times" className="p-button-text" />
                        <Button label="확인" icon="pi pi-check" className="p-button-text" onClick={onSave} />
                        <Button label="닫기" icon="pi pi-times" className="p-button-text" />
                    </>
                }
                style={{ width: "1200px" }}
                className="custom-dialog"
            >
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

                                if (li.type == "등록") {
                                    prop = "input";
                                    propClass = "dndnode input";
                                } else if (li.type == "종료") {
                                    prop = "output";
                                    propClass = "dndnode output";
                                } else {
                                    prop = "defualt";
                                    propClass = "dndnode";
                                }

                                return (
                                    <div
                                        id={li.id}
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
                    <ReactFlowProvider>
                        <div
                            className="reactflow-wrapper"
                            ref={reactFlowWrapper}
                            style={{ border: "1px solid #dee2e6", padding: "3px" }}
                        >
                            <ReactFlow
                                nodes={nodes}
                                edges={edges}
                                onNodesChange={onNodesChange}
                                onEdgesChange={onEdgesChange}
                                onConnect={onConnect}
                                onInit={onInit}
                                // onNodeDragStop={onNodeDragStop}
                                onNodeDrag={onNodeDrag}
                                onDrop={onDrop}
                                onDragOver={onDragOver}
                                onNodesDelete={onNodesDelete}
                                edgeTypes={edgeTypes}
                                defaultEdgeOptions={defaultEdgeOptions}
                                snapToGrid={true}
                                snapGrid={[25, 25]}
                                zoomOnScroll={false}
                                deleteKeyCode={["Delete", "BackSpace"]}
                                // fitView
                            >
                                <Controls />
                            </ReactFlow>
                        </div>
                    </ReactFlowProvider>
                </div>
            </Dialog>
        </>
    );
};

export default ReactFlowContainer;
