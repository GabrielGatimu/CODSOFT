import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    jobs: []
}

const jobSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        // createJob: (state, action) => {
        // },
        // removeJob: (state, action) => {
        // },
        setStateJobs: (state, action) => {
            state.jobs = action.payload
        },
    }
})

export const {setStateJobs} = jobSlice.actions
export default jobSlice.reducer