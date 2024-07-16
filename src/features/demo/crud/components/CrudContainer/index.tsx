"use client";

import React, { useEffect, useRef, useState } from "react";
import { Column, DataTable } from "@/common/components";
import { useGetUserListQuery, useLazyGetUserListQuery } from "../../redux/usersApi";
import { UserListReq } from "../../types";
import { Button } from "primereact/button";
import { SelectButton } from "primereact/selectbutton";
import { MultiSelect } from "primereact/multiselect";

const CrudContainer = () => {
    const [value, setValue] = useState<UserListReq[]>([]);
    const { data, error, isFetching } = useGetUserListQuery({
        del_yn: "N",
        page_startnum: 1,
        page_endnum: 10,
    });

    const [selectedDatas, setSelectedDatas] = useState([]);
    const dt = useRef(null);
    //const [findUser, { data: findData }] = useLazyGetUserListQuery();
    const [selectedCities, setSelectedCities] = useState(null);
    const cities = [
        { name: "New York", code: "NY" },
        { name: "Rome", code: "RM" },
        { name: "London", code: "LDN" },
        { name: "Istanbul", code: "IST" },
        { name: "Paris", code: "PRS" },
    ];

    const testFunc = () => {
        var data = {
            del_yn: "N",
            page_startnum: 1,
            page_endnum: 10,
        };
        console.log("dd");
        //findUser(data);
    };

    const header = (
        <div className="flex align-items-center justify-end gap-2">
            <Button type="button" icon="pi pi-file" rounded />
            <Button type="button" icon="pi pi-trash" severity="danger" rounded />
        </div>
    );

    return (
        <>
            <div className="card flex justify-content-center">
                <MultiSelect
                    value={selectedCities}
                    onChange={(e) => setSelectedCities(e.value)}
                    options={cities}
                    optionLabel="name"
                    placeholder="Select Cities"
                    maxSelectedLabels={3}
                    className="w-full md:w-20rem"
                />
            </div>
            <Button label="test" onClick={testFunc} />
            <DataTable
                size="small"
                selectionMode="checkbox"
                selection={selectedDatas}
                onSelectionChange={(e) => setSelectedDatas(e.value)}
                value={data && data.list}
                rows={5}
                header={header}
                selec
            >
                <Column selectionMode="multiple" style={{ width: "1rem", textAlign: "center" }} />
                <Column sortable field="id" header="Num" style={{ width: "1rem" }}></Column>
                <Column sortable field="name" header="이름"></Column>
                <Column sortable field="email" header="이메일"></Column>
            </DataTable>
        </>
    );
};

export default CrudContainer;
