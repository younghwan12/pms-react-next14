import React, { SyntheticEvent, useState } from "react";

interface Props {
    children: JSX.Element;
    codeText: string;
}

const CopyBtn: React.FC<Props> = ({ children, codeText }) => {
    const handleClick = (e: SyntheticEvent) => {
        navigator.clipboard.writeText(codeText);
    };

    return (
        <div>
            <span className="text-white absolute right-2 top-1 hover:cursor-pointer transition hover:scale-150">
                <i className="pi pi-copy" onClick={handleClick} />
            </span>
            {children}
        </div>
    );
};

export default CopyBtn;
