import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    profileInfo: localStorage.getItem("profileInfo") ? JSON.parse(localStorage.getItem("profileInfo")) : null
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.userInfo = action.payload
            localStorage.setItem("profileInfo", JSON.stringify(action.payload))
        },
        removeProfile: (state) => {
            state.userInfo = null
            localStorage.removeItem("profileInfo")
        }
    }
})

export const {setProfile, updateProfile} = profileSlice.actions
export default profileSlice.reducer