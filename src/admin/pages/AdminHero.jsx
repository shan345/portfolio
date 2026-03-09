import React, { useEffect, useState } from 'react';
import {
    Box, Typography, Card, TextField, Button, CircularProgress,
    Alert, IconButton, Chip, Divider
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

const AdminHero = () => {
    const { authHeader } = useAdmin();
    const [hero, setHero] = useState({ greeting: '', typewriterStrings: [], resumeLink: '' });
    const [newString, setNewString] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/hero`)
            .then(res => setHero(res.data))
            .finally(() => setLoading(false));
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setAlert(null);
        try {
            const res = await axios.put(`${API_BASE_URL}/api/hero`, hero, authHeader());
            setHero(res.data);
            setAlert({ type: 'success', msg: 'Hero section updated!' });
        } catch {
            setAlert({ type: 'error', msg: 'Failed to save changes.' });
        } finally {
            setSaving(false);
        }
    };

    const addString = () => {
        if (newString.trim()) {
            setHero(h => ({ ...h, typewriterStrings: [...h.typewriterStrings, newString.trim()] }));
            setNewString('');
        }
    };

    const removeString = (idx) => {
        setHero(h => ({ ...h, typewriterStrings: h.typewriterStrings.filter((_, i) => i !== idx) }));
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress sx={{ color: '#6366f1' }} /></Box>;

    return (
        <Box>
            <Typography sx={{ color: '#f1f5f9', fontSize: 24, fontWeight: 700, mb: 0.5 }}>Hero Section</Typography>
            <Typography sx={{ color: '#64748b', fontSize: 14, mb: 3 }}>Edit the banner greeting and typewriter effect.</Typography>

            {alert && <Alert severity={alert.type} sx={{ mb: 2 }} onClose={() => setAlert(null)}>{alert.msg}</Alert>}

            <Card sx={{ p: 3, bgcolor: '#1e293b', border: '1px solid #334155', borderRadius: '12px' }}>
                <TextField fullWidth label="Greeting Text" value={hero.greeting}
                    onChange={e => setHero({ ...hero, greeting: e.target.value })}
                    sx={{ ...inputSx, mb: 3 }} />

                <TextField fullWidth label="Resume Link (URL)" value={hero.resumeLink}
                    onChange={e => setHero({ ...hero, resumeLink: e.target.value })}
                    sx={{ ...inputSx, mb: 3 }} />

                <Typography sx={{ color: '#94a3b8', fontSize: 13, mb: 1.5, fontWeight: 600 }}>TYPEWRITER STRINGS</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {hero.typewriterStrings.map((s, i) => (
                        <Chip key={i} label={s}
                            onDelete={() => removeString(i)}
                            deleteIcon={<DeleteIcon />}
                            sx={{ bgcolor: 'rgba(99,102,241,0.15)', color: '#c7d2fe', border: '1px solid rgba(99,102,241,0.3)' }}
                        />
                    ))}
                </Box>
                <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                    <TextField size="small" label="Add new string" value={newString}
                        onChange={e => setNewString(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && addString()}
                        sx={{ ...inputSx, flexGrow: 1 }} />
                    <Button onClick={addString} variant="outlined" startIcon={<AddIcon />}
                        sx={{ borderColor: '#6366f1', color: '#818cf8', '&:hover': { borderColor: '#818cf8', bgcolor: 'rgba(99,102,241,0.1)' } }}>
                        Add
                    </Button>
                </Box>

                <Divider sx={{ borderColor: '#334155', mb: 3 }} />

                <Typography sx={{ color: '#94a3b8', fontSize: 13, mb: 1.5, fontWeight: 600 }}>PROFILE IMAGE</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {hero.profileImage ? (
                            <Box
                                component="img"
                                src={hero.profileImage}
                                alt="Profile"
                                sx={{ width: 100, height: 100, borderRadius: '12px', objectFit: 'cover', border: '1px solid #334155' }}
                            />
                        ) : (
                            <Box sx={{ width: 100, height: 100, borderRadius: '12px', bgcolor: 'rgba(255,255,255,0.05)', border: '1px dashed #475569', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography sx={{ color: '#64748b', fontSize: 12 }}>No Image</Typography>
                            </Box>
                        )}
                        <Button
                            variant="outlined"
                            component="label"
                            disabled={saving}
                            sx={{ borderColor: '#6366f1', color: '#818cf8', '&:hover': { borderColor: '#818cf8', bgcolor: 'rgba(99,102,241,0.1)' } }}
                        >
                            Upload Image
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    setSaving(true);
                                    const formData = new FormData();
                                    formData.append('image', file);
                                    try {
                                        const res = await axios.post(`${API_BASE_URL}/api/upload`, formData, authHeader());
                                        setHero(h => ({ ...h, profileImage: res.data.url }));
                                        setAlert({ type: 'success', msg: 'Image uploaded successfully!' });
                                    } catch (err) {
                                        setAlert({ type: 'error', msg: 'Image upload failed.' });
                                    } finally {
                                        setSaving(false);
                                    }
                                }}
                            />
                        </Button>
                        {hero.profileImage && (
                            <Button size="small" color="error" onClick={() => setHero(h => ({ ...h, profileImage: '' }))}>Remove</Button>
                        )}
                    </Box>
                    <TextField fullWidth size="small" label="Or paste Image URL" value={hero.profileImage || ''}
                        onChange={e => setHero({ ...hero, profileImage: e.target.value })}
                        sx={inputSx} />
                </Box>

                <Divider sx={{ borderColor: '#334155', mb: 3 }} />

                <Button onClick={handleSave} variant="contained" disabled={saving} startIcon={saving ? <CircularProgress size={18} /> : <SaveIcon />}
                    sx={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '8px', py: 1.2, px: 3 }}>
                    {saving ? 'Saving...' : 'Save Changes'}
                </Button>
            </Card>
        </Box>
    );
};

export default AdminHero;
