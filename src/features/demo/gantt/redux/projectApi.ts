import qs from "query-string";
import appApi from "@/redux/appApi";
import { ProjectListRes, ProjectListReq } from "../types";
import { CommonApiResponse } from "@/common/types";

const appTaggedApi = appApi.enhanceEndpoints({
    addTagTypes: ["project"],
});

const projectApi = appTaggedApi.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query<CommonApiResponse<ProjectListRes>, ProjectListReq>({
            query: (query) => ({
                // ?${qs.stringify(query)}
                url: `/project/projects`,
                method: "GET",
            }),
            providesTags: () => [{ type: "project" }],
        }),
        postProjects: builder.mutation<CommonApiResponse<ProjectListRes>, ProjectListReq>({
            query: (query) => ({
                url: `/project/project`,
                method: "POST",
                body: query,
            }),
            invalidatesTags: () => [{ type: "project" }],
        }),
    }),
    overrideExisting: true,
});

export default projectApi;
export const { useGetProjectsQuery, usePostProjectsMutation } = projectApi;
