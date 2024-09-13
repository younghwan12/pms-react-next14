import { Column } from "@/common/components";
import { DataTable } from "primereact/datatable";
import { TabPanel, TabView } from "primereact/tabview";
import React, { useRef, useState } from "react";

const ReqMgrContainer = () => {
    const [data, setData] = useState<any | never>();
    const [selectedDatas, setSelectedDatas] = useState([]);
    const dt = useRef(null);
    // const [findUser, { data: findData }] = useLazyGetUserListQuery();

    return (
        <TabView>
            <TabPanel header="요구사항 관리" key="tab1">
                <h2 className="mb-4 text-lg">페이지 관리</h2>
                <DataTable
                    size="small"
                    selectionMode="checkbox"
                    selection={selectedDatas}
                    onSelectionChange={(e) => setSelectedDatas(e.value)}
                    value={data && data.list}
                    rowHover
                    rows={5}
                >
                    <Column field="num" header="번호"></Column>
                    <Column field="step" header="단계"></Column>
                    <Column field="name" header="메뉴명"></Column>
                    <Column field="wf" header="워크플로"></Column>
                    <Column field="desc" header="설명"></Column>
                </DataTable>
            </TabPanel>
            <TabPanel header={<i className="pi pi-plus"></i>} key="addTab"></TabPanel>
        </TabView>
    );
};

export default ReqMgrContainer;
