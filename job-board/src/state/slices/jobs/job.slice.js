import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    jobList: []
}

const jobSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        setStateJobs: (state, action) => {
            const newJobs  = action.payload
            state.jobList = state.jobList.concat(newJobs.filter(newJob => !state.jobList.some(oldJob => oldJob.id === newJob.id)))
            // state.jobList = [...state.jobList, ...action.payload];
        },
    }
})

export const {setStateJobs} = jobSlice.actions
export default jobSlice.reducer