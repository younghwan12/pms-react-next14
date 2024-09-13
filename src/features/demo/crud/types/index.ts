import { Paging } from "@/common/types";

export type ProjectListRes = {
    projectNo?: string;
    projectName?: string;
    startDt?: string;
    endDt?: string;
    del_yn?: string;
};

export type ProjectListReq = Paging & {
    projectNo?: string;
    projectName?: string;
    startDte?: string;
    endDte?: string;
    status?: string;
    del_yn: string;
};
