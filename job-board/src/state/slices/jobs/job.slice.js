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
            const newJobs  = action.payload
            state.jobList = state.jobList.concat(newJobs.filter(newJob => !state.jobList.some(oldJob => oldJob.id === newJob.id)))
            // state.jobList = [...state.jobList, ...action.payload];
        },
        setUserBookmarks: (state, action) => {
            const newBookmarks = action.payload
            state.bookmarkedJobs = state.bookmarkedJobs.concat(newBookmarks.filter(newFav => !state.bookmarkedJobs.some(oldFav => oldFav.id === newFav.id)))
        },
        removeBookmark: (state, action) => {
            const {job_id} = action.payload
            state.bookmarkedJobs = state.bookmarkedJobs.filter(bookmark => !(bookmark.job_id === job_id))
        },
        // createJob: (state, action) => {
        //     state.employerJobs = [...state.employerJobs, ...action.payload]
        // },
        setEmployerJobs: (state, action) => {
            state.employerJobs = [...state.employerJobs, ...action.payload]
        }
    }
})

export const {setStateJobs, setUserBookmarks, removeBookmark, setEmployerJobs} = jobSlice.actions
export default jobSlice.reducer