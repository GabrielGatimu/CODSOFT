import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1",
    // credentials: "include"
})

export const apiSlice
    = createApi({
    baseQuery,
    tagTypes: ["User, Job, JobApplication"],

    endpoints: (builder) => ({}),
})