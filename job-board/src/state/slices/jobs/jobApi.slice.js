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
                url: `${JOBS_URL}/employer`,
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

        // --- Bookmarks --- //
        toggleBookmark: builder.mutation({
            query: (jobId) => ({
                url: `${JOBS_URL}/candidate/bookmark/${jobId}`,
                method: "PUT"
            })
        }),
        getUserBookmarks : builder.mutation({
            query: () => ({
                url: `${JOBS_URL}/candidate/bookmarks`,
                method: "GET"
            })
        }),
        // getJob : builder.mutation({}),
        // editJob : builder.mutation({}),
        // deleteJob : builder.mutation({}),
    })
})

export const {
    useGetJobsMutation,
    useGetEmployerJobsMutation,
    useCreateJobMutation,
    useToggleBookmarkMutation,
    useGetUserBookmarksMutation,
} = jobApiSlice
