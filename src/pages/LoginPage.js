import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/authSlice'
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate= useNavigate()
  const {isLoggedIn} = useSelector(state=>state.auth)
  const state = useSelector(state=>state.auth)
  const handleLogin=()=>{
    dispatch(login());
    navigate("/repos")
  }
  console.log(state)
  return (
    <div>LoginPage

      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default LoginPage