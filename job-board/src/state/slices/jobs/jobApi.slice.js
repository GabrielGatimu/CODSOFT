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
        // createJob : builder.mutation({}),
        // editJob : builder.mutation({}),
        // deleteJob : builder.mutation({}),
    })
})

export const {
    useGetJobsMutation,
    useToggleBookmarkMutation,
    useGetUserBookmarksMutation,
} = jobApiSlice
