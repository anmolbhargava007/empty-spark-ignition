import axios from 'axios'
import { baseURL, nodeBaseURL } from '@/store/constant'

const apiClient = axios.create({
    baseURL: `${baseURL}/api/v1`,
    headers: {
        'Content-Type': 'application/json',
        'x-request-from': 'internal'
    }
})

const apiClientNodeJs = axios.create({
    baseURL: `${nodeBaseURL}/api/v2`,
    headers: {
        'Content-Type': 'application/json',
        'x-request-from': 'internal'
    }
})

// Add basic auth from localStorage (if available)
apiClient.interceptors.request.use((config) => {
    try {
        const username = localStorage?.getItem('username')
        const password = localStorage?.getItem('password')

        if (username && password) {
            config.auth = { username, password }
        }
    } catch (e) {
        // If localStorage is not available (e.g., SSR), silently ignore
    }

    return config
})

export default apiClient
export { apiClientNodeJs }