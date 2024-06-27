import qs from "query-string";
import appApi from "@/redux/appApi";
import { UserListReq, UserListRes } from "../types";
import { CommonApiResponse } from "@/common/types";

const appTaggedApi = appApi.enhanceEndpoints({
    addTagTypes: ["users"],
});

const issuesMgtApi = appTaggedApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserList: builder.query<CommonApiResponse<UserListRes>, UserListReq>({
            query: (query) => ({
                url: `pt/test/users?${qs.stringify(query)}`,
                method: "GET",
            }),
            providesTags: () => [{ type: "users" }],
        }),
    }),
    overrideExisting: true,
});

export default issuesMgtApi;
export const { useGetUserListQuery, useLazyGetUserListQuery } = issuesMgtApi;
