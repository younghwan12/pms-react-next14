export interface UserListRes {
    id?: string;
    name?: string;
    email?: string;
}

export interface UserListReq {
    sp_uid?: string;
    del_yn: string;
    id?: string;
    name?: string;
    page_startnum?: number;
    page_endnum?: number;
}
