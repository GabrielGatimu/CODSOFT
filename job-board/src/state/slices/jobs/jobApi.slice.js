import {apiSlice} from "../api.slice.js";
const JOBS_URL = '/jobs'

export const jobApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getJobs : builder.mutation({
            query: () => ({
                url: `${JOBS_URL}`,
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


// import { apiSlice } from "../api.slice.js";
// const AUTH_URL = "/auth";
//
// export const jobApiSlice = apiSlice.injectEndpoints({
//     endpoints: (builder) => ({
//         register: builder.mutation({
//             query: (data) => ({
//                 url: `${AUTH_URL}/signUp`,
//                 method: "POST",
//                 body: data,
//             }),
//         }),
//         verifyUser: builder.mutation({
//             query: (confirmationCode) => ({
//                 url: `${AUTH_URL}/verify/${confirmationCode}`,
//                 method: "POST",
//             }),
//         }),
//         login: builder.mutation({
//             query: (data) => ({
//                 url: `${AUTH_URL}/signIn`,
//                 method: "POST",
//                 body: data,
//             }),
//         }),
//         logout: builder.mutation({
//             query: () => ({
//                 url: `${AUTH_URL}/logout`,
//                 method: "POST",
//             }),
//         }),
//         forgotPassword: builder.mutation({
//             query: (data) => ({
//                 url: `${AUTH_URL}/forgot-password`,
//                 method: "POST",
//                 body: data,
//             }),
//         }),
//         resetPassword: builder.mutation({
//             query: (accessCode, data) => ({
//                 url: `${AUTH_URL}/reset-password/${accessCode}`,
//                 method: "PUT",
//                 body: data,
//             }),
//         }),
//     }),
// });
//
// export const {
//     useRegisterMutation,
//     useVerifyUserMutation,
//     useLoginMutation,
//     useLogoutMutation,
//     useForgotPasswordMutation,
//     useResetPasswordMutation,
// } = jobApiSlice;
