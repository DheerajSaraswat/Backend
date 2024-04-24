import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: true,
    loginData: null,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
}

const authSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setLoginData: (state, action) => {
            state.loginData = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const { setLoginData, setToken, setLoading } = authSlice.actions

export default authSlice.reducer