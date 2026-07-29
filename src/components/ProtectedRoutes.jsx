import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
    let isLogin = localStorage.getItem('Login') || false;
    return (
        <>
            {isLogin ? children : <Navigate to='/login' />}
        </>
    )
}

export default ProtectedRoutes;