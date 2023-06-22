import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn'),
  token: localStorage.getItem('token'),
}

export const authSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    login: (state,action) => {
      state.isLoggedIn = true
      state.token=action.payload
      localStorage.setItem('isLoggedIn',true)
      localStorage.setItem('token',action.payload)
    },
    logout: (state) => {
      state.isLoggedIn = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { login } = authSlice.actions

export default authSlice.reducer