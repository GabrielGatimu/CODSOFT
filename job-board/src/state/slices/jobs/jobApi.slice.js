import {apiSlice} from "../api.slice.js";
const JOBS_URL = '/jobs'

export const jobApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getJobs : builder.mutation({
            query: (pageNumber) => ({
                url: `${JOBS_URL}?pageNumber=${pageNumber}`,
                method: "GET"
            })
        }),
        getEmployerJobs: builder.mutation({
            query:() => ({
                url: `${JOBS_URL}/my-jobs`,
                method: "GET"
            })
        }),
        createJob : builder.mutation({
            query: (data) => ({
                url: `${JOBS_URL}/add`,
                method: "POST",
                body: data
            })
        }),
        getJob : builder.mutation({
            query: (jobId) => ({
                url: `${JOBS_URL}/${jobId}`,
                method: "GET",
            })
        }),
        // --- Bookmarks --- //
        toggleBookmark: builder.mutation({
            query: (jobId) => ({
                url: `${JOBS_URL}/bookmark/${jobId}`,
                method: "PUT"
            })
        }),
        getUserBookmarks : builder.mutation({
            query: () => ({
                url: `${JOBS_URL}/view/bookmarks`,
                method: "GET"
            })
        }),
        //  --- Applications --- //
        applyJob : builder.mutation({
            query: (data) => ({
                url: `${JOBS_URL}/apply`,
                method: "POST",
                body: data
            })
        }),

        // editJob : builder.mutation({}),
        // deleteJob : builder.mutation({}),
    })
})

export const {
    useGetJobsMutation,
    useGetEmployerJobsMutation,
    useCreateJobMutation,
    useGetJobMutation,
    useToggleBookmarkMutation,
    useGetUserBookmarksMutation,
    useApplyJobMutation
} = jobApiSlice
