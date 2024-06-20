import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "@/config/config";
import { RootState } from "./store";

const baseQuery = fetchBaseQuery({
    // baseUrl: config.url.API_BASE_URL,
    baseUrl: config.url.API_BASE_URL,
    // prepareHeaders: (headers, { getState }) => {
    //     const token = (getState() as RootState).auth.token;
    //     // If we have a token set in state, let's assume that we should be passing it.
    //     if (token) {
    //         headers.set("authorization", `Bearer ${token}`);
    //     }
    //     return headers;
    // },
    // headers: {
    //     // Authorization: bearerAuth(token),
    //     Authorization: `Bearer 111111`,
    // },
});

const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: baseQuery,
    endpoints: (builder) => ({}),
});

function bearerAuth(token: string | undefined) {
    return `Bearer ${token} `;
}

export default appApi;
