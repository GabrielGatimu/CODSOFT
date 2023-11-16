import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
    baseUrl: ""
})

export const apiSlice
 = createApi({
    baseQuery,
    tagTypes: ["User, Job, JobApplication"],

    // eslint-disable-next-line no-unused-vars
    endpoints: (builder) => ({}),
})