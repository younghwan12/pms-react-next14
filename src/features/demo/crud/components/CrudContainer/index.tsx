import { Column } from "@/common/components";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useEffect, useRef, useState } from "react";
import { useGetProjectsQuery, usePostProjectsMutation } from "../../redux/projectApi";
import { ProjectListReq, ProjectListRes } from "../../types";
import { useForm } from "react-hook-form";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import { RootState } from "@/redux/store";

const CrudContainer = () => {
    const [value, setValue] = useState<ProjectListRes[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const [getProject] = usePostProjectsMutation();
    const { data } = useGetProjectsQuery({
        del_yn: "N",
        page_startnum: 1,
        page_endnum: 10,
    });
    const [postData] = usePostProjectsMutation();
    const [totalRecords, setTotalRecords] = useState(0);
    const [selectedDatas, setSelectedDatas] = useState<ProjectListRes[]>([]);
    const toast = useRef<Toast>(null);
    const [toastVisible, setToastVisible] = useState<boolean>(false);

    const [lazyState, setlazyState] = useState({
        first: 0,
        rows: 10,
        page: 1,
        sortField: null,
        sortOrder: null,
    });

    let networkTimeout = null as any;

    useEffect(() => {
        loadLazyData();
    }, [lazyState]);

    const loadLazyData = () => {
        // setLoading(true);

        if (networkTimeout) {
            clearTimeout(networkTimeout);
        }

        //imitate delay of a backend call
        networkTimeout = setTimeout(() => {
            getProject({ del_yn: "N", page_startnum: 1, page_endnum: 10 }).then((data) => {
                console.log(data.data);
                if (data.data) {
                    setTotalRecords(data.data?.list_cnt);
                    setValue(data.data.list);
                }
            });
        }, Math.random() * 1000);
    };

    const header = (
        <div className="flex align-items-center justify-end gap-2">
            <Button
                type="button"
                icon="pi pi-file"
                rounded
                tooltip="생성"
                tooltipOptions={{ position: "top" }}
                onClick={() => ViewModal()}
            />
            <Button
                type="button"
                icon="pi pi-trash"
                severity="danger"
                rounded
                tooltip="삭제"
                tooltipOptions={{ position: "top" }}
            />
        </div>
    );

    const ViewModal = () => {
        reset();
        setVisible(true);
    };

    const { register, handleSubmit, reset } = useForm<ProjectListReq>({
        // resetOptions: {
        //     keepValues: false,
        // },
        defaultValues: {
            projectNo: "",
            projectName: "",
            startDte: "",
            endDte: "",
            status: "001",
        },
    });

    const accept = handleSubmit((data) => {
        console.log(data);
        postData(data);
        setVisible(false);
        setToastVisible(false);
        // toast.current?.show({ severity: "info", summary: "Confirmed", detail: "You have accepted", life: 3000 });
    });

    const reject = () => {
        toast.current?.show({ severity: "warn", summary: "취소", detail: "취소하셨습니다.", life: 3000 });
    };

    const submitFunction = () => {
        setToastVisible(true);
        // console.log(data)
    };

    return (
        <>
            <Toast ref={toast} />
            <ConfirmDialog
                style={{ width: 400 }}
                visible={toastVisible}
                onHide={() => setToastVisible(false)}
                message="저장하시겠습니까?"
                header="Confirmation"
                icon="pi pi-exclamation-triangle"
                accept={accept}
                reject={reject}
            />
            {/* <Button label="test" /> */}
            <div className="card">
                <DataTable
                    size="small"
                    // loading={isFetching}
                    selectionMode="checkbox"
                    selection={selectedDatas}
                    onSelectionChange={(e) => setSelectedDatas(e.value)}
                    value={data && data.list}
                    virtualScrollerOptions={{ itemSize: 46 }}
                    rowHover
                    scrollable
                    scrollHeight="400px"
                    // lazy
                    // rows={5}
                    // paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    // paginator
                    showGridlines
                    header={header}
                >
                    <Column selectionMode="multiple" style={{ width: "1rem", textAlign: "center" }} />
                    <Column sortable field="projectNo" header="프로젝트 No." style={{ width: "24%" }}></Column>
                    <Column sortable field="projectName" header="프로젝트명" style={{ width: "24%" }}></Column>
                    <Column sortable field="startDt" header="시작일시" style={{ width: "24%" }}></Column>
                    <Column sortable field="endDt" header="종료일시" style={{ width: "24%" }}></Column>
                </DataTable>
            </div>

            <Dialog
                header="프로젝트 생성"
                visible={visible}
                style={{ width: "50vw" }}
                onHide={() => {
                    if (!visible) return;
                    setVisible(false);
                }}
            >
                <form>
                    <div className="grid gap-4 py-2">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label className="text-left">프로젝트No.</label>
                            <InputText
                                {...register("projectNo")}
                                placeholder="프로젝트NO를 입력하세요"
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <div className="grid gap-4 py-2">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label className="text-left">프로젝트명</label>
                            <InputText
                                {...register("projectName")}
                                placeholder="프로젝트명을 입력하세요"
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <div className="grid gap-4 py-2">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label className="text-left">시작일시</label>
                            <Calendar {...register("startDte")} className="col-span-3" dateFormat="yy-mm-dd" />
                        </div>
                    </div>
                    <div className="grid gap-4 py-2">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label className="text-left">종료일시</label>
                            <Calendar {...register("endDte")} className="col-span-3" dateFormat="yy-mm-dd" />
                        </div>
                    </div>
                    <div className="text-right pt-4">
                        <Button
                            type="reset"
                            label="취소"
                            icon="pi pi-times"
                            onClick={() => setVisible(false)}
                            className="p-button-text"
                        />
                        <Button type="button" onClick={submitFunction} icon="pi pi-check" label="저장" />
                    </div>
                </form>
            </Dialog>
        </>
    );
};

export default CrudContainer;
