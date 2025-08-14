import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography, Alert, CircularProgress, TextField } from '@mui/material'
import { useAuth } from '@/contexts/AuthContext'
import { StyledButton } from '@/ui-component/button/StyledButton'
import MainCard from '@/ui-component/cards/MainCard'
import logo from '@/assets/images/logo.png'

const Signup = () => {
    const { signup, loading } = useAuth()
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        user_pwd: '',
        user_mobile: '',
        gender: 'MALE',
        is_active: true
    })
    const [error, setError] = useState('')
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
        setError('')
        setSuccess('')

        const result = await signup(formData)

        if (result.success) {
            setSuccess('Account created successfully! Redirecting to login...')
        } else if (result.error) {
            setError(result.error)
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
                            Create Account
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
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
                        <TextField
                            label="Full Name"
                            name="user_name"
                            value={formData.user_name}
                            onChange={handleChange}
                            required
                            fullWidth
                            variant="outlined"
                            sx={{ mb: 3 }}
                        />

                        <TextField
                            label="Email"
                            name="user_email"
                            type="email"
                            value={formData.user_email}
                            onChange={handleChange}
                            required
                            fullWidth
                            variant="outlined"
                            sx={{ mb: 3 }}
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
                            sx={{ mb: 3 }}
                        />

                        <TextField
                            label="Mobile Number"
                            name="user_mobile"
                            value={formData.user_mobile}
                            onChange={handleChange}
                            required
                            fullWidth
                            variant="outlined"
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

                        <Typography variant="body2" align="center" color="textSecondary">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                style={{
                                    color: '#3b82f6',
                                    textDecoration: 'none',
                                    fontWeight: 600,
                                }}
                            >
                                Sign In
                            </Link>
                        </Typography>
                    </Box>
                </MainCard>
            </Box>
        </Box>
    )
}

export default Signup