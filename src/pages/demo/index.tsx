import { Column, DataTable } from "@/common/components";
import AppWrapper from "@/layout/AppWrapper";
import React from "react";

const DemoPage = () => {
    const data = [
        {
            id: 1,
            name: "일영",
        },
        {
            id: 2,
            name: "이영",
        },
        {
            id: 3,
            name: "삼영",
        },
        {
            id: 4,
            name: "삼영",
        },
        {
            id: 5,
            name: "삼영",
        },
        {
            id: 6,
            name: "삼영",
        },
    ];
    const data1 = [];
    return (
        <AppWrapper>
            <DataTable size="small" value={data} rows={5}>
                <Column align={"center"} field="id" header="ID"></Column>
                <Column field="name" header="Name"></Column>
            </DataTable>
        </AppWrapper>
    );
};

export default DemoPage;
