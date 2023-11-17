import {createSlice} from "@reduxjs/toolkit";

const initialState = []

const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        setJob: (state, action) => {
        },
        removeJob: (state, action) => {
        },
        getJobs: (state, action) => {
        },
    }
})

export const {setJOb, removeJob, getJobs} = jobSlice.actions
export default jobSlice.reducer