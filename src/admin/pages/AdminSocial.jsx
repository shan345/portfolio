import React, { useEffect, useState } from 'react';
import {
    Box, Typography, Card, TextField, Button, CircularProgress,
    Alert, Grid, InputAdornment
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import API_BASE_URL from '../../config/api';
import { useAdmin } from '../context/AdminContext';

const inputSx = {
    '& .MuiOutlinedInput-root': {
        color: '#e2e8f0',
        '& fieldset': { borderColor: '#334155' },
        '&:hover fieldset': { borderColor: '#6366f1' },
        '&.Mui-focused fieldset': { borderColor: '#6366f1' }
    },
    '& .MuiInputLabel-root': { color: '#64748b' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#6366f1' },
    '& .MuiInputAdornment-root .MuiSvgIcon-root': { color: '#64748b' }
};

const socialFields = [
    { key: 'instagram', label: 'Instagram URL', icon: <InstagramIcon />, color: '#e1306c' },
    { key: 'github', label: 'GitHub URL', icon: <GitHubIcon />, color: '#94a3b8' },
    { key: 'linkedin', label: 'LinkedIn URL', icon: <LinkedInIcon />, color: '#0077b5' },
    { key: 'youtube', label: 'YouTube URL', icon: <YouTubeIcon />, color: '#ff0000' },
    { key: 'twitter', label: 'Twitter / X URL', icon: <XIcon />, color: '#e2e8f0' },
];

const AdminSocial = () => {
    const { authHeader } = useAdmin();
    const [social, setSocial] = useState({ instagram: '', github: '', linkedin: '', youtube: '', twitter: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/social`)
            .then(res => setSocial(res.data))
            .finally(() => setLoading(false));
    }, []);

    const handleSave = async () => {
        setSaving(true); setAlert(null);
        try {
            const res = await axios.put(`${API_BASE_URL}/api/social`, social, authHeader());
            setSocial(res.data);
            setAlert({ type: 'success', msg: 'Social links updated!' });
        } catch {
            setAlert({ type: 'error', msg: 'Failed to save changes.' });
        } finally { setSaving(false); }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress sx={{ color: '#6366f1' }} /></Box>;

    return (
        <Box>
            <Typography sx={{ color: '#f1f5f9', fontSize: 24, fontWeight: 700, mb: 0.5 }}>Social Links</Typography>
            <Typography sx={{ color: '#64748b', fontSize: 14, mb: 3 }}>Manage your social media profile links.</Typography>

            {alert && <Alert severity={alert.type} sx={{ mb: 2 }} onClose={() => setAlert(null)}>{alert.msg}</Alert>}

            <Card sx={{ p: 3, bgcolor: '#1e293b', border: '1px solid #334155', borderRadius: '12px' }}>
                <Grid container spacing={2.5}>
                    {socialFields.map(field => (
                        <Grid item xs={12} sm={6} key={field.key}>
                            <TextField
                                fullWidth label={field.label}
                                value={social[field.key] || ''}
                                onChange={e => setSocial({ ...social, [field.key]: e.target.value })}
                                sx={inputSx}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Box sx={{ color: field.color }}>{field.icon}</Box>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ mt: 3 }}>
                    <Button onClick={handleSave} variant="contained" disabled={saving}
                        startIcon={saving ? <CircularProgress size={18} /> : <SaveIcon />}
                        sx={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '8px', py: 1.2, px: 3 }}>
                        {saving ? 'Saving...' : 'Save Changes'}
                    </Button>
                </Box>
            </Card>
        </Box>
    );
};

export default AdminSocial;
