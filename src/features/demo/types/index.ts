export interface UserListRes {
    sp_uid?: string;
    id?: string;
    name?: string;
}

export interface UserListReq {
    sp_uid?: string;
    del_yn: string;
    id?: string;
    name?: string;
    page_startnum?: number;
    page_endnum?: number;
}
