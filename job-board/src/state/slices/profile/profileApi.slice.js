import { apiSlice } from '../api.slice.js'
const PROFILE_URL = "/user/profile";

export const profileApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.mutation({
            query: () => ({
                url: `${PROFILE_URL}`,
                method: "GET",
            }),
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
    useUpdateUserMutation,
    useDeleteUserMutation
} = profileApiSlice;
