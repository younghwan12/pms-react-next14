import { DataTable as PDataTable } from "primereact/datatable";
import type { DataTableBaseProps, DataTableValueArray } from "primereact/datatable";

import { useState, useCallback, useMemo, useEffect } from "react";

interface ICustomDataTableProps<TValue extends DataTableValueArray> extends DataTableBaseProps<TValue> {
    extraButtons?: React.ReactNode;
    tooltip?: React.ReactNode;
    extraForm?: React.ReactNode;
    refresh?: React.ReactNode;
    rowNums?: number[] | null;
    onRefresh?: () => void;
    onRowClick?: any;
}

const DataTable = <TValue extends DataTableValueArray>(props: ICustomDataTableProps<TValue>) => {
    const { value, onSelect, extraButtons, tooltip, extraForm, refresh, rowNums, onRefresh, onRowClick, ...rest } =
        props;
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(props.rowNums ? props.rowNums[0] : props.rows);

    return (
        <>
            <PDataTable
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                width={"100%"}
                emptyMessage="데이터가 없습니다."
                showGridlines
                // rowsPerPageOptions={[5, 10, 25, 50]}
                rows={rows}
                {...props}
                paginator
            ></PDataTable>
        </>
    );
};

export default DataTable;
