import {createSlice} from "@reduxjs/toolkit";
import {mockJobs} from "../../../data/mock.data.js";

const jobsSlice = createSlice({
    name: 'jobs',
    initialState: mockJobs,
    reducers: {
        setJob: (state, action) => {
        },
        removeJob: (state, action) => {
        },
        getJobs: (state, action) => {
        },
    }
})

export const {setJOb, removeJob, getJobs} = jobsSlice.actions
export default jobsSlice.reducer