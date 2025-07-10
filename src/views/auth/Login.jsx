import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Box, Typography, Alert, CircularProgress } from '@mui/material'
import { useAuth } from '@/contexts/AuthContext'
import { signIn } from '@/api/auth'
import Input from '@/ui-component/input/Input'
import StyledButton from '@/ui-component/button/StyledButton'
import MainCard from '@/ui-component/cards/MainCard'

const Login = () => {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [formData, setFormData] = useState({
        user_email: '',
        user_pwd: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const response = await signIn(formData)
            
            if (response.success) {
                const userData = response.data[0]
                login(userData)
                navigate('/chatflows')
            } else {
                setError(response.msg || 'Login failed')
            }
        } catch (error) {
            setError(error?.response?.data?.msg || 'Login failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1) 0%, hsl(var(--secondary) / 0.1) 100%)',
                p: 2
            }}
        >
            <MainCard
                sx={{
                    maxWidth: 400,
                    width: '100%',
                    p: 4
                }}
            >
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h3" component="h1" sx={{ mb: 1, color: 'hsl(var(--primary))' }}>
                        Welcome Back
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Sign in to your account
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                    <Input
                        label="Email"
                        name="user_email"
                        type="email"
                        value={formData.user_email}
                        onChange={handleChange}
                        required
                        fullWidth
                        sx={{ mb: 3 }}
                    />

                    <Input
                        label="Password"
                        name="user_pwd"
                        type="password"
                        value={formData.user_pwd}
                        onChange={handleChange}
                        required
                        fullWidth
                        sx={{ mb: 4 }}
                    />

                    <StyledButton
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        sx={{ mb: 3, py: 1.5 }}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Sign In'}
                    </StyledButton>

                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" color="textSecondary">
                            New user?{' '}
                            <Link 
                                to="/signup" 
                                style={{ 
                                    color: 'hsl(var(--primary))',
                                    textDecoration: 'none',
                                    fontWeight: 600
                                }}
                            >
                                Register
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </MainCard>
        </Box>
    )
}

export default Login