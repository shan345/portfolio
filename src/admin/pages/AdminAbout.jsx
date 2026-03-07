import React, { useEffect, useState } from 'react';
import {
    Box, Typography, Card, TextField, Button, CircularProgress,
    Alert, IconButton, Grid
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
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
    '& .MuiInputLabel-root.Mui-focused': { color: '#6366f1' }
};

const SectionTitle = ({ children }) => (
    <Typography sx={{ color: '#94a3b8', fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', mb: 1.5 }}>
        {children}
    </Typography>
);

const AdminAbout = () => {
    const { authHeader } = useAdmin();
    const [about, setAbout] = useState({
        education: { degree: '', college: '' },
        certifications: [],
        internship: { company: '', role: '', duration: '' },
        resumeLink: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/about`)
            .then(res => setAbout(res.data))
            .finally(() => setLoading(false));
    }, []);

    const handleSave = async () => {
        setSaving(true); setAlert(null);
        try {
            const res = await axios.put(`${API_BASE_URL}/api/about`, about, authHeader());
            setAbout(res.data);
            setAlert({ type: 'success', msg: 'About section updated!' });
        } catch {
            setAlert({ type: 'error', msg: 'Failed to save changes.' });
        } finally { setSaving(false); }
    };

    const addCert = () => {
        setAbout(a => ({ ...a, certifications: [...a.certifications, { title: '', certId: '' }] }));
    };

    const removeCert = (idx) => {
        setAbout(a => ({ ...a, certifications: a.certifications.filter((_, i) => i !== idx) }));
    };

    const updateCert = (idx, field, value) => {
        setAbout(a => {
            const certs = [...a.certifications];
            certs[idx] = { ...certs[idx], [field]: value };
            return { ...a, certifications: certs };
        });
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress sx={{ color: '#6366f1' }} /></Box>;

    return (
        <Box>
            <Typography sx={{ color: '#f1f5f9', fontSize: 24, fontWeight: 700, mb: 0.5 }}>About Section</Typography>
            <Typography sx={{ color: '#64748b', fontSize: 14, mb: 3 }}>Manage your education, certifications, and internship info.</Typography>

            {alert && <Alert severity={alert.type} sx={{ mb: 2 }} onClose={() => setAlert(null)}>{alert.msg}</Alert>}

            <Grid container spacing={2.5}>
                {/* Education */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 3, bgcolor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', height: '100%' }}>
                        <SectionTitle>Education</SectionTitle>
                        <TextField fullWidth label="Degree" value={about.education?.degree || ''}
                            onChange={e => setAbout(a => ({ ...a, education: { ...a.education, degree: e.target.value } }))}
                            sx={{ ...inputSx, mb: 2 }} />
                        <TextField fullWidth label="College/University" value={about.education?.college || ''}
                            onChange={e => setAbout(a => ({ ...a, education: { ...a.education, college: e.target.value } }))}
                            sx={inputSx} />
                    </Card>
                </Grid>

                {/* Internship */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 3, bgcolor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', height: '100%' }}>
                        <SectionTitle>Internship</SectionTitle>
                        <TextField fullWidth label="Company" value={about.internship?.company || ''}
                            onChange={e => setAbout(a => ({ ...a, internship: { ...a.internship, company: e.target.value } }))}
                            sx={{ ...inputSx, mb: 2 }} />
                        <TextField fullWidth label="Role" value={about.internship?.role || ''}
                            onChange={e => setAbout(a => ({ ...a, internship: { ...a.internship, role: e.target.value } }))}
                            sx={{ ...inputSx, mb: 2 }} />
                        <TextField fullWidth label="Duration" value={about.internship?.duration || ''}
                            onChange={e => setAbout(a => ({ ...a, internship: { ...a.internship, duration: e.target.value } }))}
                            sx={inputSx} />
                    </Card>
                </Grid>

                {/* Certifications */}
                <Grid item xs={12}>
                    <Card sx={{ p: 3, bgcolor: '#1e293b', border: '1px solid #334155', borderRadius: '12px' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <SectionTitle>Certifications</SectionTitle>
                            <Button size="small" onClick={addCert} startIcon={<AddIcon />}
                                sx={{ color: '#818cf8', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '8px' }}>
                                Add
                            </Button>
                        </Box>
                        {about.certifications?.map((cert, idx) => (
                            <Box key={idx} sx={{ display: 'flex', gap: 1.5, mb: 1.5, alignItems: 'center' }}>
                                <TextField size="small" label="Certificate Name" value={cert.title}
                                    onChange={e => updateCert(idx, 'title', e.target.value)}
                                    sx={{ ...inputSx, flexGrow: 1 }} />
                                <TextField size="small" label="Certificate ID" value={cert.certId}
                                    onChange={e => updateCert(idx, 'certId', e.target.value)}
                                    sx={{ ...inputSx, width: 220 }} />
                                <IconButton onClick={() => removeCert(idx)} sx={{ color: '#ef4444' }}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        ))}
                    </Card>
                </Grid>

                {/* Resume */}
                <Grid item xs={12}>
                    <Card sx={{ p: 3, bgcolor: '#1e293b', border: '1px solid #334155', borderRadius: '12px' }}>
                        <SectionTitle>Resume Link</SectionTitle>
                        <TextField fullWidth label="Google Drive / Resume URL" value={about.resumeLink || ''}
                            onChange={e => setAbout(a => ({ ...a, resumeLink: e.target.value }))}
                            sx={inputSx} />
                    </Card>
                </Grid>
            </Grid>

            <Box sx={{ mt: 3 }}>
                <Button onClick={handleSave} variant="contained" disabled={saving} startIcon={saving ? <CircularProgress size={18} /> : <SaveIcon />}
                    sx={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '8px', py: 1.2, px: 3 }}>
                    {saving ? 'Saving...' : 'Save All Changes'}
                </Button>
            </Box>
        </Box>
    );
};

export default AdminAbout;
