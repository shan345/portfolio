import React, { useEffect, useState } from 'react';
import {
    Box, Typography, Card, TextField, Button, CircularProgress,
    Alert, IconButton, Grid, MenuItem, Select, InputLabel, FormControl
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
    '& .MuiInputLabel-root.Mui-focused': { color: '#6366f1' },
    '& .MuiSelect-icon': { color: '#64748b' },
};

const SectionTitle = ({ children }) => (
    <Typography sx={{ color: '#94a3b8', fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', mb: 1.5 }}>
        {children}
    </Typography>
);

const EMPLOYMENT_TYPES = ['Full-time', 'Part-time', 'Internship', 'Freelance'];

const emptyExperience = () => ({
    company: '', role: '', employmentType: 'Full-time',
    startDate: '', endDate: 'Present', totalDuration: '',
    location: '', description: ''
});

const AdminAbout = () => {
    const { authHeader } = useAdmin();
    const [about, setAbout] = useState({
        education: { degree: '', college: '' },
        certifications: [],
        experiences: [],
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

    // Certification helpers
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

    // Experience helpers
    const addExp = () => {
        setAbout(a => ({ ...a, experiences: [...(a.experiences || []), emptyExperience()] }));
    };
    const removeExp = (idx) => {
        setAbout(a => ({ ...a, experiences: a.experiences.filter((_, i) => i !== idx) }));
    };
    const updateExp = (idx, field, value) => {
        setAbout(a => {
            const exps = [...(a.experiences || [])];
            exps[idx] = { ...exps[idx], [field]: value };
            return { ...a, experiences: exps };
        });
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress sx={{ color: '#6366f1' }} /></Box>;

    return (
        <Box>
            <Typography sx={{ color: '#f1f5f9', fontSize: 24, fontWeight: 700, mb: 0.5 }}>About Section</Typography>
            <Typography sx={{ color: '#64748b', fontSize: 14, mb: 3 }}>Manage your education, experience, certifications, and resume.</Typography>

            {alert && <Alert severity={alert.type} sx={{ mb: 2 }} onClose={() => setAlert(null)}>{alert.msg}</Alert>}

            <Grid container spacing={2.5}>
                {/* Education */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 3, bgcolor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', height: '100%' }}>
                        <SectionTitle>Education</SectionTitle>
                        <TextField fullWidth label="Degree" value={about.education?.degree || ''}
                            onChange={e => setAbout(a => ({ ...a, education: { ...a.education, degree: e.target.value } }))}
                            sx={{ ...inputSx, mb: 2 }} />
                        <TextField fullWidth label="College / University" value={about.education?.college || ''}
                            onChange={e => setAbout(a => ({ ...a, education: { ...a.education, college: e.target.value } }))}
                            sx={inputSx} />
                    </Card>
                </Grid>

                {/* Resume */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 3, bgcolor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', height: '100%' }}>
                        <SectionTitle>Resume Link</SectionTitle>
                        <TextField fullWidth label="Google Drive / Resume URL" value={about.resumeLink || ''}
                            onChange={e => setAbout(a => ({ ...a, resumeLink: e.target.value }))}
                            sx={inputSx} />
                    </Card>
                </Grid>

                {/* Experience */}
                <Grid item xs={12}>
                    <Card sx={{ p: 3, bgcolor: '#1e293b', border: '1px solid #334155', borderRadius: '12px' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <SectionTitle>Work Experience</SectionTitle>
                            <Button size="small" onClick={addExp} startIcon={<AddIcon />}
                                sx={{ color: '#818cf8', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '8px' }}>
                                Add Experience
                            </Button>
                        </Box>

                        {(about.experiences || []).length === 0 && (
                            <Typography sx={{ color: '#475569', fontSize: 13, textAlign: 'center', py: 2 }}>
                                No experience entries yet. Click "Add Experience" to get started.
                            </Typography>
                        )}

                        {(about.experiences || []).map((exp, idx) => (
                            <Box key={idx} sx={{
                                mb: 3, p: 2.5, border: '1px solid #334155', borderRadius: '10px',
                                bgcolor: '#0f172a', position: 'relative'
                            }}>
                                {/* Header row with index and delete */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                    <Typography sx={{ color: '#6366f1', fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
                                        Experience #{idx + 1}
                                    </Typography>
                                    <IconButton onClick={() => removeExp(idx)} size="small" sx={{ color: '#ef4444' }}>
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Box>

                                <Grid container spacing={2}>
                                    {/* Company */}
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth size="small" label="Company / Organization"
                                            value={exp.company || ''}
                                            onChange={e => updateExp(idx, 'company', e.target.value)}
                                            sx={inputSx} />
                                    </Grid>
                                    {/* Role */}
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth size="small" label="Job Title / Role"
                                            value={exp.role || ''}
                                            onChange={e => updateExp(idx, 'role', e.target.value)}
                                            sx={inputSx} />
                                    </Grid>
                                    {/* Employment Type */}
                                    <Grid item xs={12} sm={4}>
                                        <FormControl fullWidth size="small" sx={inputSx}>
                                            <InputLabel>Employment Type</InputLabel>
                                            <Select
                                                value={exp.employmentType || 'Full-time'}
                                                label="Employment Type"
                                                onChange={e => updateExp(idx, 'employmentType', e.target.value)}
                                                sx={{ color: '#e2e8f0', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#334155' } }}
                                                MenuProps={{ PaperProps: { sx: { bgcolor: '#1e293b', color: '#e2e8f0' } } }}
                                            >
                                                {EMPLOYMENT_TYPES.map(t => (
                                                    <MenuItem key={t} value={t} sx={{ '&:hover': { bgcolor: 'rgba(99,102,241,0.1)' } }}>{t}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    {/* Start Date */}
                                    <Grid item xs={12} sm={4}>
                                        <TextField fullWidth size="small" label="Start Date (e.g. Jun 2023)"
                                            value={exp.startDate || ''}
                                            onChange={e => updateExp(idx, 'startDate', e.target.value)}
                                            sx={inputSx} />
                                    </Grid>
                                    {/* End Date */}
                                    <Grid item xs={12} sm={4}>
                                        <TextField fullWidth size="small" label="End Date (or 'Present')"
                                            value={exp.endDate || ''}
                                            onChange={e => updateExp(idx, 'endDate', e.target.value)}
                                            sx={inputSx} />
                                    </Grid>
                                    {/* Total Duration */}
                                    <Grid item xs={12} sm={4}>
                                        <TextField fullWidth size="small" label="Total Duration (e.g. 1 yr 6 mos)"
                                            value={exp.totalDuration || ''}
                                            onChange={e => updateExp(idx, 'totalDuration', e.target.value)}
                                            sx={inputSx} />
                                    </Grid>
                                    {/* Location */}
                                    <Grid item xs={12} sm={8}>
                                        <TextField fullWidth size="small" label="Location (e.g. Chennai, India or Remote)"
                                            value={exp.location || ''}
                                            onChange={e => updateExp(idx, 'location', e.target.value)}
                                            sx={inputSx} />
                                    </Grid>
                                    {/* Description */}
                                    <Grid item xs={12}>
                                        <TextField fullWidth size="small" label="Description (brief summary of your work)"
                                            value={exp.description || ''}
                                            onChange={e => updateExp(idx, 'description', e.target.value)}
                                            multiline rows={3}
                                            sx={inputSx} />
                                    </Grid>
                                </Grid>
                            </Box>
                        ))}
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
