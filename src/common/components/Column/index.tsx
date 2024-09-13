import { Column as PColumn } from "primereact/column";
export { treeNumberTemplate, numberTemplate } from "./numberTemplate";

class Column extends PColumn {
    static defaultProps = {
        ...PColumn,
        sortable: false,
        alignHeader: "center",
        align: "center",
        whiteSpace: "pre-line",
    };
}

export default Column;
