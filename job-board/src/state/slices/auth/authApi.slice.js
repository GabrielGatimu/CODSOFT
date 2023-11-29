import { apiSlice } from '../api.slice.js'
const AUTH_URL = "/auth";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        google: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/google`,
                method: "POST",
                body: data,
            }),
        }),
        signup: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/signup`,
                method: "POST",
                body: data,
            }),
        }),
        verifyUser: builder.mutation({
            query: (confirmationCode) => ({
                url: `${AUTH_URL}/verify/${confirmationCode}`,
                method: "POST",
            }),
        }),
        signin: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/signin`,
                method: "POST",
                body: data,
            }),
        }),
        signout: builder.mutation({
            query: () => ({
                url: `${AUTH_URL}/signout`,
                method: "POST",
            }),
        }),
        forgotPassword: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/forgot-password`,
                method: "POST",
                body: data,
            }),
        }),
        resetPassword: builder.mutation({
            query: (accessCode, data) => ({
                url: `${AUTH_URL}/reset-password/${accessCode}`,
                method: "PUT",
                body: data,
            }),
        }),
    }),
});

export const {
    useGoogleMutation,
    useSignupMutation,
    useVerifyUserMutation,
    useSigninMutation,
    useSignoutMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
} = authApiSlice;
