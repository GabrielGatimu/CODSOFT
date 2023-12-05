import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    jobList: [],
    bookmarkedJobs: [],
    employerJobs: []
}

const jobSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        setStateJobs: (state, action) => {
            const newJobs = action.payload
            state.jobList = state.jobList.concat(newJobs.filter(newJob => !state.jobList.some(oldJob => oldJob.id === newJob.id)))
            // state.jobList = [...state.jobList, ...action.payload];
        },
        setEmployerJobs: (state, action) => {
            state.employerJobs = [...state.employerJobs, ...action.payload]
        },
        setUserBookmarks: (state, action) => {
            state.bookmarkedJobs = [...state.bookmarkedJobs, ...action.payload]
        },
        removeBookmark: (state, action) => {
            const jobId = action.payload
            state.bookmarkedJobs = state.bookmarkedJobs.filter(bookmark => !(bookmark.id === jobId))
        },
       removeAllUserJobsData: (state, action) => {
            state.bookmarkedJobs = []
            state.employerJobs = []
        }
    }
})

export const {setStateJobs, setUserBookmarks, removeBookmark, setEmployerJobs, removeAllUserJobsData} = jobSlice.actions
export default jobSlice.reducer