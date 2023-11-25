import {apiSlice} from "../api.slice.js";
const JOBS_URL = 'http://127.0.0.1:8080/api/v1/jobs'

export const jobApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getJobs : builder.mutation({
            query: (pageNumber) => ({
                url: `${JOBS_URL}?pageNumber=${pageNumber}`,
                method: "GET"
            })
        }),
        // getJob : builder.mutation({}),
        // createJob : builder.mutation({}),
        // editJob : builder.mutation({}),
        // deleteJob : builder.mutation({}),
    })
})

export const {
    useGetJobsMutation
} = jobApiSlice
