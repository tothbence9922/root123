import { createSlice } from '@reduxjs/toolkit'

export const headerSlice = createSlice({
  name: 'header',
  initialState: {
    auth: localStorage.getItem("token") ? true : false,
    token: localStorage.getItem("token"),
  },
  reducers: {
    login: (state, action) => {
      state.auth = true
      state.token = action.payload.token
    },
    logout: (state, action) => {
      state.auth = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = headerSlice.actions

export default headerSlice.reducer