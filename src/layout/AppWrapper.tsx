import React from "react";

const AppWrapper = ({ ...props }) => {
    return <main className="min-h-screen">{props.children}</main>;
};

export default AppWrapper;
