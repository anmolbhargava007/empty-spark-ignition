import { createContext, useContext, useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'

const AuthContext = createContext()

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                loading: false
            }
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                loading: false
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state
    }
}

const initialState = {
    isAuthenticated: false,
    user: null,
    loading: true
}

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState)

    useEffect(() => {
        // Check if user is already logged in
        const userData = localStorage.getItem('userData')
        if (userData) {
            try {
                const user = JSON.parse(userData)
                dispatch({ type: 'LOGIN_SUCCESS', payload: user })
            } catch (error) {
                localStorage.removeItem('userData')
                dispatch({ type: 'SET_LOADING', payload: false })
            }
        } else {
            dispatch({ type: 'SET_LOADING', payload: false })
        }
    }, [])

    const login = (userData) => {
        localStorage.setItem('userData', JSON.stringify(userData))
        dispatch({ type: 'LOGIN_SUCCESS', payload: userData })
    }

    const logout = () => {
        localStorage.removeItem('userData')
        localStorage.removeItem('username')
        localStorage.removeItem('password')
        dispatch({ type: 'LOGOUT' })
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            login,
            logout
        }}>
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