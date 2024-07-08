import React, { useState } from "react";

export default () => {
    const [leftItem, setLeftItem] = useState([
        {
            id: "1",
            name: "시작",
            desc: "설명1",
            type: "등록",
            color: "#ff5f99",
        },
        {
            id: "2",
            name: "중간1",
            desc: "설명2",
            color: "#98c220",
        },
        {
            id: "3",
            name: "중간2",
            desc: "설명3",
            color: "#3598fe",
        },
        {
            id: "4",
            name: "종료",
            desc: "설명4",
            type: "종료",
            color: "#888",
        },
    ]);

    const onDragStart = (
        event: any,
        nodeType: string,
        nodeId: string,
        nodeName: string,
        nodeColor: string,
        nodeDesc: string
    ) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.setData("application/nodeId", nodeId);
        event.dataTransfer.setData("application/nodeName", nodeName);
        event.dataTransfer.setData("application/nodeColor", nodeColor);
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
                                    color,
                                    desc
                                )
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
