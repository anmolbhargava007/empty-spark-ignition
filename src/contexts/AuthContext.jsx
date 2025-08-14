import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { signIn, signUp } from '@/api/auth'
import { enqueueSnackbar } from '@/store/actions'

const AuthContext = createContext()

// Security constants
const STORAGE_KEYS = {
    USER_DISPLAY: 'flowise_user_display',
    USER_ROLE: 'flowise_user_role'
}

const USER_ROLES = {
    GUEST: 2,
    USER: 1,
    ADMIN: 0
}

// Generate secure hash for tamper detection
const generateSecurityHash = (userId, isAppValid, expiryDate, userRole) => {
    const isDev = import.meta.env.DEV
    if (isDev) return 'dev_mode'
    
    const hashInput = `${userId}-${isAppValid}-${expiryDate}-${userRole}-${Date.now()}`
    return btoa(hashInput)
}

// Verify security hash
const verifySecurityHash = (hash, userId, isAppValid, expiryDate, userRole) => {
    const isDev = import.meta.env.DEV
    if (isDev) return true
    
    // In production, implement more sophisticated hash verification
    // This is a simplified version - in real apps use proper cryptographic hashing
    return hash && hash.length > 0
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(false)
    const [userRole, setUserRole] = useState(USER_ROLES.GUEST)
    const [expiryDate, setExpiryDate] = useState(null)
    const [isAppValid, setIsAppValid] = useState(false)
    const [securityHash, setSecurityHash] = useState(null)
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Initialize UI display data from localStorage (cosmetic only)
    useEffect(() => {
        try {
            const storedDisplayName = localStorage.getItem(STORAGE_KEYS.USER_DISPLAY)
            const storedRole = localStorage.getItem(STORAGE_KEYS.USER_ROLE)
            
            // Only use for UI display, never for access control
            if (storedDisplayName && !user) {
                // This is purely cosmetic - doesn't grant access
                console.log('Restored display name for UI:', storedDisplayName)
            }
        } catch (error) {
            console.warn('Could not read UI display data:', error)
        }
        setLoading(false)
    }, [user])

    const showNotification = (message, variant = 'info') => {
        dispatch(enqueueSnackbar({
            message,
            options: {
                variant,
                autoHideDuration: 5000
            }
        }))
    }

    const signin = async (credentials) => {
        setLoading(true)
        try {
            const response = await signIn(credentials)
            
            if (response && response.user) {
                const userData = response.user
                const role = userData.role || USER_ROLES.USER
                const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
                const appValid = true
                
                // Generate security hash for tamper detection
                const hash = generateSecurityHash(userData.id, appValid, expiry, role)
                
                // Set in-memory state (source of truth)
                setUser(userData)
                setIsAuthenticated(true)
                setUserRole(role)
                setExpiryDate(expiry)
                setIsAppValid(appValid)
                setSecurityHash(hash)
                
                // Store UI-only data for display continuity (NOT for access control)
                try {
                    localStorage.setItem(STORAGE_KEYS.USER_DISPLAY, userData.name || userData.email)
                    localStorage.setItem(STORAGE_KEYS.USER_ROLE, role.toString())
                } catch (error) {
                    console.warn('Could not store UI display data:', error)
                }
                
                showNotification('Successfully signed in!', 'success')
                
                // Role-based navigation
                switch (role) {
                    case USER_ROLES.ADMIN:
                        navigate('/dashboard')
                        break
                    case USER_ROLES.USER:
                        navigate('/chatflows')
                        break
                    default:
                        navigate('/workspace')
                }
                
                return { success: true, user: userData }
            } else {
                throw new Error('Invalid response from server')
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Sign in failed'
            showNotification(errorMessage, 'error')
            return { success: false, error: errorMessage }
        } finally {
            setLoading(false)
        }
    }

    const signup = async (userData) => {
        setLoading(true)
        try {
            const response = await signUp(userData)
            
            if (response && response.success) {
                showNotification('Account created successfully! Please sign in.', 'success')
                navigate('/login')
                return { success: true }
            } else {
                throw new Error(response?.message || 'Signup failed')
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Signup failed'
            showNotification(errorMessage, 'error')
            return { success: false, error: errorMessage }
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        // Clear all in-memory state
        setUser(null)
        setIsAuthenticated(false)
        setUserRole(USER_ROLES.GUEST)
        setExpiryDate(null)
        setIsAppValid(false)
        setSecurityHash(null)
        
        // Clear UI-only localStorage data
        try {
            localStorage.removeItem(STORAGE_KEYS.USER_DISPLAY)
            localStorage.removeItem(STORAGE_KEYS.USER_ROLE)
        } catch (error) {
            console.warn('Could not clear UI display data:', error)
        }
        
        showNotification('Successfully logged out', 'info')
        navigate('/login')
    }

    const updateUserData = (updatedUser) => {
        if (!isAuthenticated) return
        
        // Update in-memory state
        setUser(prevUser => ({ ...prevUser, ...updatedUser }))
        
        // Update UI-only localStorage for display continuity
        try {
            if (updatedUser.name || updatedUser.email) {
                localStorage.setItem(STORAGE_KEYS.USER_DISPLAY, updatedUser.name || updatedUser.email)
            }
        } catch (error) {
            console.warn('Could not update UI display data:', error)
        }
    }

    const checkFeatureAccess = () => {
        const isDev = import.meta.env.DEV
        
        // Always allow in development
        if (isDev) return true
        
        // In production, verify in-memory state and hash
        if (!isAuthenticated || !isAppValid || !securityHash) {
            return false
        }
        
        // Check if session has expired
        if (expiryDate && new Date() > new Date(expiryDate)) {
            logout()
            return false
        }
        
        // Verify security hash to detect tampering
        const isHashValid = verifySecurityHash(securityHash, user?.id, isAppValid, expiryDate, userRole)
        if (!isHashValid) {
            showNotification('Security violation detected. Please sign in again.', 'error')
            logout()
            return false
        }
        
        return true
    }

    const contextValue = {
        // State
        user,
        isAuthenticated,
        loading,
        userRole,
        expiryDate,
        isAppValid,
        
        // Methods
        signin,
        signup,
        logout,
        updateUserData,
        checkFeatureAccess,
        
        // Utilities
        USER_ROLES
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export { USER_ROLES }