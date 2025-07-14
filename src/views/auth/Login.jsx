import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Box, Typography, Alert, CircularProgress, TextField } from '@mui/material'
import { useAuth } from '@/contexts/AuthContext'
import { signIn } from '@/api/auth'
import { StyledButton } from '@/ui-component/button/StyledButton'
import MainCard from '@/ui-component/cards/MainCard'
import logo from '@/assets/images/logo.png'

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
                background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                px: 2,
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 520,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box
                    component="img"
                    src={logo}
                    alt="Logo"
                    sx={{
                        height: 64,
                        mb: 3,
                    }}
                />

                <MainCard
                    sx={{
                        width: '100%',
                        p: 4,
                        boxShadow: 3,
                        borderRadius: 4,
                        backgroundColor: '#fff',
                    }}
                >
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography variant="h4" component="h1" sx={{ mb: 1, color: '#111827' }}>
                            Welcome Back
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Sign in to your account
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            name="user_email"
                            type="email"
                            value={formData.user_email}
                            onChange={handleChange}
                            required
                            fullWidth
                            variant="outlined"
                            size="medium"
                            sx={{ mb: 3, borderRadius: 2 }}
                        />

                        <TextField
                            label="Password"
                            name="user_pwd"
                            type="password"
                            value={formData.user_pwd}
                            onChange={handleChange}
                            required
                            fullWidth
                            variant="outlined"
                            size="medium"
                            sx={{ mb: 4, borderRadius: 2 }}
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

                        <Typography variant="body2" align="center" color="textSecondary">
                            New user?{' '}
                            <Link
                                to="/signup"
                                style={{
                                    color: '#3b82f6',
                                    textDecoration: 'none',
                                    fontWeight: 600,
                                }}
                            >
                                Register
                            </Link>
                        </Typography>
                    </Box>
                </MainCard>
            </Box>
        </Box>
    )
}

export default Login