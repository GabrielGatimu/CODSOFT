import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "./slices/api.slice.js";
import authReducer from './slices/auth/auth.slice.js'
import jobsReducer from './slices/jobs/jobs.slice.js'

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: '',
        jobs: jobsReducer,
        jobApplication: '',
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store