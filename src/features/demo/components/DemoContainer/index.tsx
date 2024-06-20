import React, { useEffect, useState } from "react";
import { Column, DataTable } from "@/common/components";
import { useGetUserListQuery, useLazyGetUserListQuery } from "../../redux/usersApi";
import { UserListReq } from "../../types";
import { Button } from "primereact/button";

const DemoContainer = () => {
    const [value, setValue] = useState<UserListReq[]>([]);
    const { data, error } = useGetUserListQuery({
        sp_uid: "20200611145500679038",
        del_yn: "N",
        page_startnum: 1,
        page_endnum: 10,
    });
    const [findUser, { data: findData, isFetching }] = useLazyGetUserListQuery();

    const testFunc = () => {
        var data = {
            sp_uid: "20200611145500679038",
            del_yn: "N",
            page_startnum: 1,
            page_endnum: 10,
        };
        findUser(data);
    };

    return (
        <>
            <Button label="test" onClick={testFunc} />
            <DataTable loading={isFetching} size="small" value={findData && findData.list} rows={5}>
                <Column field="id" header="ID"></Column>
                <Column field="name" header="Name"></Column>
            </DataTable>
        </>
    );
};

export default DemoContainer;
