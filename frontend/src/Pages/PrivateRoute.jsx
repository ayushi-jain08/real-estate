import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
const PrivateRoute = () => {
    const navigate = useNavigate()
    const {currentUser} = useSelector((state) => state.user)
    return currentUser ? <Outlet/> : <Navigate to="/sign-in"/>
  }

export default PrivateRoute

