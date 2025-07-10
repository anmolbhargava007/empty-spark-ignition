import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Box, Typography, Alert, CircularProgress } from '@mui/material'
import { signUp } from '@/api/auth'
import Input from '@/ui-component/input/Input'
import StyledButton from '@/ui-component/button/StyledButton'
import MainCard from '@/ui-component/cards/MainCard'

const Signup = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        user_pwd: '',
        user_mobile: '',
        gender: 'MALE',
        is_active: true
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        setError('')
        setSuccess('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess('')

        try {
            const response = await signUp(formData)
            
            if (response.success) {
                setSuccess('Account created successfully! Redirecting to login...')
                setTimeout(() => {
                    navigate('/login')
                }, 2000)
            } else {
                setError(response.msg || 'Signup failed')
            }
        } catch (error) {
            setError(error?.response?.data?.msg || 'Signup failed. Please try again.')
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
                        Create Account
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Join us today
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                        {success}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                    <Input
                        label="Full Name"
                        name="user_name"
                        value={formData.user_name}
                        onChange={handleChange}
                        required
                        fullWidth
                        sx={{ mb: 3 }}
                    />

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
                        sx={{ mb: 3 }}
                    />

                    <Input
                        label="Mobile Number"
                        name="user_mobile"
                        value={formData.user_mobile}
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
                        {loading ? <CircularProgress size={24} /> : 'Create Account'}
                    </StyledButton>

                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" color="textSecondary">
                            Already have an account?{' '}
                            <Link 
                                to="/login" 
                                style={{ 
                                    color: 'hsl(var(--primary))',
                                    textDecoration: 'none',
                                    fontWeight: 600
                                }}
                            >
                                Sign In
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </MainCard>
        </Box>
    )
}

export default Signup