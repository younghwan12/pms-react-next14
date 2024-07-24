export type CommonApiResponse<T> = {
    list: T[];
    list_cnt: number;
};

export type Paging = {
    page_startnum: number;
    page_endnum: number;
};
