import apiClient from './client'

export const signIn = async (credentials) => {
    const response = await apiClient.post('/signin', credentials)
    return response.data
}

export const signUp = async (userData) => {
    const response = await apiClient.post('/signup', userData)
    return response.data
}