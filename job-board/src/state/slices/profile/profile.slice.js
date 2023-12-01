// import {createSlice} from "@reduxjs/toolkit";
//
// const initialState = {
//     userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
// }
//
// const profileSlice = createSlice({
//     name: 'profile',
//     initialState,
//     reducers: {
//         setCredentials: (state, action) => {
//             state.userInfo = action.payload
//             localStorage.setItem("userInfo", JSON.stringify(action.payload))
//         },
//         removeCredentials: (state) => {
//             state.userInfo = null
//             localStorage.removeItem("userInfo")
//         }
//     }
// })
//
// export const {setCredentials, removeCredentials} = profileSlice.actions
// export default profileSlice.reducer