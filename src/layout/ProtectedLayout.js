import React from 'react'

import { useDispatch,useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedLayout = () => {
  const {isLoggedIn} = useSelector(state=>state.auth)
  const state = useSelector(state=>state.auth)
  console.log(state)
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return (
    <>
    <Outlet/>
    
    </>
  )
}

export default ProtectedLayout