import React, { useCallback } from "react";
import { useReactFlow } from "reactflow";

export default function ContextMenu({ id, title, top, left, right, bottom, ...props }) {
    const { getNode, setNodes, addNodes, setEdges } = useReactFlow();
    const duplicateNode = useCallback(() => {
        const node = getNode(id);
        if (node) {
            const position = {
                x: node.position.x + 50,
                y: node.position.y + 50,
            };

            addNodes({
                ...node,
                selected: false,
                dragging: false,
                id: `${node.id}-copy`,
                position,
            });
        }
    }, [id, getNode, addNodes]);

    const deleteNode = useCallback(() => {
        setNodes((nodes) => nodes.filter((node) => node.id !== id));
        setEdges((edges) => edges.filter((edge) => edge.source !== id));
    }, [id, setNodes, setEdges]);

    return (
        <div
            //  style={{ top: top - 150, right: right + 420 }}
            className="context-menu rounded-md"
            {...props}
        >
            <p style={{ padding: "0.5em 1em" }}>
                <small>
                    <strong>{title}</strong> 선택됨
                </small>
            </p>
            <button onClick={duplicateNode}>
                <i className="pi pi-copy align-middle mr-1" />
                복사
            </button>
            <button onClick={deleteNode}>
                <i className="pi pi-times align-middle mr-1" />
                삭제
            </button>
        </div>
    );
}
