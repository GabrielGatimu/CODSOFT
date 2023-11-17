import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "./slices/api.slice.js";
import authReducer from './slices/auth/auth.slice.js'

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: '',
        job: '',
        jobApplication: '',
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store