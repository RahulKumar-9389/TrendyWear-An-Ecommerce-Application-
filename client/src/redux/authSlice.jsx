import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem('auth')) ? JSON.parse(localStorage.getItem('auth')).user : null,
    token: JSON.parse(localStorage.getItem('auth')) ? JSON.parse(localStorage.getItem('auth')).token : ''
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
            localStorage.setItem('auth', JSON.stringify(action.payload))
        },
        logout: (state, action) => {
            state.user = null
            state.token = ""
            localStorage.removeItem('auth')
        }

    }

});


export default authSlice.reducer;
export const { login, logout } = authSlice.actions;