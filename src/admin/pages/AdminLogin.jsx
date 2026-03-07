import React, { useState } from 'react';
import {
    Box, Card, Typography, TextField, Button, Alert,
    InputAdornment, IconButton, CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff, LockOutlined } from '@mui/icons-material';
import { useAdmin } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const { login } = useAdmin();
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', password: '' });
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(form.username, form.password);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed. Check credentials.');
        } finally {
            setLoading(false);
        }
    };

    const inputSx = {
        '& .MuiOutlinedInput-root': {
            color: '#e2e8f0',
            '& fieldset': { borderColor: '#334155' },
            '&:hover fieldset': { borderColor: '#6366f1' },
            '&.Mui-focused fieldset': { borderColor: '#6366f1' }
        },
        '& .MuiInputLabel-root': { color: '#64748b' },
        '& .MuiInputLabel-root.Mui-focused': { color: '#6366f1' }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15) 0%, #0f172a 70%)'
        }}>
            <Card sx={{
                width: { xs: '90%', sm: 420 },
                p: 4,
                bgcolor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '16px',
                boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
            }}>
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Box sx={{
                        width: 56, height: 56, borderRadius: '14px',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        mx: 'auto', mb: 2, boxShadow: '0 8px 24px rgba(99,102,241,0.4)'
                    }}>
                        <LockOutlined sx={{ color: '#fff', fontSize: 26 }} />
                    </Box>
                    <Typography sx={{ color: '#f1f5f9', fontSize: 24, fontWeight: 700 }}>Admin Panel</Typography>
                    <Typography sx={{ color: '#64748b', fontSize: 14, mt: 0.5 }}>Portfolio Management System</Typography>
                </Box>

                {error && <Alert severity="error" sx={{ mb: 2, bgcolor: 'rgba(239,68,68,0.1)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.3)' }}>{error}</Alert>}

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth label="Username" value={form.username}
                        onChange={e => setForm({ ...form, username: e.target.value })}
                        required sx={{ ...inputSx, mb: 2 }}
                    />
                    <TextField
                        fullWidth label="Password" type={showPass ? 'text' : 'password'}
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })}
                        required sx={{ ...inputSx, mb: 3 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPass(!showPass)} sx={{ color: '#64748b' }}>
                                        {showPass ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button
                        type="submit" fullWidth variant="contained"
                        disabled={loading}
                        sx={{
                            py: 1.4, fontSize: 15, fontWeight: 600,
                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            borderRadius: '10px',
                            '&:hover': { background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', boxShadow: '0 8px 24px rgba(99,102,241,0.4)' }
                        }}
                    >
                        {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Sign In'}
                    </Button>
                </form>
            </Card>
        </Box>
    );
};

export default AdminLogin;
