import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const AuthRedirect = ({ requireAuth = false, isLoading = false }) => {
  const connectedUser = useSelector(state => state.user.user)
  const location = useLocation()
  const [loading, setLoading] = useState(isLoading)
  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  if(!isLoading) return (

  (requireAuth === false) ?
     (connectedUser === null) ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />
     :
     connectedUser !== null ? <Outlet /> : <Navigate to="/connexion" replace />
  


  )
}

export default AuthRedirect
