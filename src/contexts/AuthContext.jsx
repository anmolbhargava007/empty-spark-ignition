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
    loading: false
}

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState)

    const login = (userData) => {
        dispatch({ type: 'LOGIN_SUCCESS', payload: userData })
    }

    const logout = () => {
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