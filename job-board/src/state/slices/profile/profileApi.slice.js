import {apiSlice} from '../api.slice.js'

const PROFILE_URL = "/u/profile";

export const profileApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.mutation({
            query: () => ({
                url: `${PROFILE_URL}`,
                method: "GET",
            }),
        }),
        getUserResume: builder.mutation({
            query: (resumeName) => ({
                url: `/jobs/resume/${resumeName}`,
                method: "GET"
            })
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${PROFILE_URL}`,
                method: "PUT",
                body: data,
            }),
        }),
        deleteUser: builder.mutation({
            query: () => ({
                url: `${PROFILE_URL}`,
                method: "DELETE",
            }),
        })
    }),
});

export const {
    useGetUserMutation,
    useGetUserResumeMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = profileApiSlice;
