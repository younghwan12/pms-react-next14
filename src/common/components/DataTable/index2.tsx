import { DataTable as PDataTable } from "primereact/datatable";

const NewDataTable = (props) => {
    return (
        <>
            <PDataTable
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                width={"100%"}
                emptyMessage="데이터가 없습니다."
                showGridlines
                // rowsPerPageOptions={[5, 10, 25, 50]}
                {...props}
                paginator
            ></PDataTable>
        </>
    );
};
export default NewDataTable;
