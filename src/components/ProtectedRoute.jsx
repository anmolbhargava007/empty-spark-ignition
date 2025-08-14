import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Box, CircularProgress } from '@mui/material'
import PropTypes from 'prop-types'

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading, checkFeatureAccess } = useAuth()

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh'
                }}
            >
                <CircularProgress />
            </Box>
        )
    }

    if (!isAuthenticated || !checkFeatureAccess()) {
        return <Navigate to="/login" replace />
    }

    return children
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired
}

export default ProtectedRoute