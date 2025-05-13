import React from 'react'
import { useAuthStore } from '../data/Store/useAuthStore.js'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuthStore();
    if (!user) {
        return <Navigate to="/website" replace />;
    }
    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute
