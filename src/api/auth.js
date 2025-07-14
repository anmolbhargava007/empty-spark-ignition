import { apiClientNodeJs } from './client'

export const signIn = async (credentials) => {
    const response = await apiClientNodeJs.post('/signin', credentials)
    return response.data
}

export const signUp = async (userData) => {
    const response = await apiClientNodeJs.post('/signup', userData)
    return response.data
}