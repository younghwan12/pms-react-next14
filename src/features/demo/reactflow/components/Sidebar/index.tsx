import React, { useState } from "react";

export default () => {
    const [leftItem, setLeftItem] = useState([
        {
            id: "1",
            name: "OPEN",
            desc: "설명1",
            type: "시작",
            color: "#ff5f99",
        },
        {
            id: "2",
            name: "Assigned",
            desc: "설명2",
            type: "진행",
        },
        {
            id: "3",
            name: "중간2",
            desc: "설명3",
            type: "진행",
        },
        {
            id: "4",
            name: "Closed",
            desc: "종료 상태",
            type: "종료",
        },
        {
            id: "5",
            name: "Deffered",
            desc: "연기 처리",
            type: "종료",
        },
    ]);

    const onDragStart = (event: any, nodeType: string, nodeId: string, nodeName: string, nodeDesc: string) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.setData("application/nodeId", nodeId);
        event.dataTransfer.setData("application/nodeName", nodeName);
        event.dataTransfer.setData("application/nodeDesc", nodeDesc);
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <aside>
            <div className="description">List</div>
            {leftItem.length > 0 &&
                leftItem.map((li, i) => {
                    let prop = "";
                    let propClass = "";
                    let color = li.color;
                    let desc = li.desc;

                    if (li.type === "시작") {
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
                                onDragStart(event, prop, event.currentTarget.id, event.currentTarget.innerText, desc)
                            }
                            draggable
                        >
                            {li.name}
                        </div>
                    );
                })}
        </aside>
    );
};
