import React, { useEffect, useState } from "react";
import { Column, DataTable } from "@/common/components";
import { useGetUserListQuery, useLazyGetUserListQuery } from "../../redux/usersApi";
import { UserListReq } from "../../types";
import { Button } from "primereact/button";

const DemoContainer = () => {
    const [value, setValue] = useState<UserListReq[]>([]);
    const { data, error, isFetching } = useGetUserListQuery({
        sp_uid: "20200611145500679038",
        del_yn: "N",
        page_startnum: 1,
        page_endnum: 10,
    });
    const [findUser, { data: findData }] = useLazyGetUserListQuery();

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
            <DataTable loading={isFetching} size="small" value={data && data.list} rows={5}>
                <Column field="company_nm" header="회사명"></Column>
                <Column field="user_id" header="사용자 ID"></Column>
                <Column field="group_code" header="권한"></Column>
                <Column field="user_name" header="이름"></Column>
                <Column field="user_status_name" header="상태"></Column>
            </DataTable>
        </>
    );
};

export default DemoContainer;
