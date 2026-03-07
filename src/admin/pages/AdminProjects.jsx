import React, { useEffect, useState } from 'react';
import {
    Box, Typography, Card, CardMedia, CardContent, CardActions,
    Grid, Button, CircularProgress, Alert, IconButton, Dialog,
    DialogTitle, DialogContent, DialogActions, TextField, Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
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

const defaultProject = { title: '', description: '', imageUrl: '', overview: '', techStack: '', liveUrl: '', githubUrl: '', order: 0 };

const AdminProjects = () => {
    const { authHeader } = useAdmin();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(defaultProject);
    const [saving, setSaving] = useState(false);
    const [alert, setAlert] = useState(null);

    const fetchProjects = () => {
        axios.get(`${API_BASE_URL}/api/projects`)
            .then(res => setProjects(res.data))
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchProjects(); }, []);

    const openAdd = () => { setForm(defaultProject); setEditing(null); setDialogOpen(true); };
    const openEdit = (p) => { setForm({ title: p.title, description: p.description, imageUrl: p.imageUrl, overview: p.overview, techStack: p.techStack, liveUrl: p.liveUrl, githubUrl: p.githubUrl, order: p.order }); setEditing(p._id); setDialogOpen(true); };

    const handleSave = async () => {
        setSaving(true);
        try {
            if (editing) {
                await axios.put(`${API_BASE_URL}/api/projects/${editing}`, form, authHeader());
            } else {
                await axios.post(`${API_BASE_URL}/api/projects`, form, authHeader());
            }
            setDialogOpen(false);
            setAlert({ type: 'success', msg: editing ? 'Project updated!' : 'Project added!' });
            fetchProjects();
        } catch {
            setAlert({ type: 'error', msg: 'Failed to save project.' });
        } finally { setSaving(false); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this project?')) return;
        try {
            await axios.delete(`${API_BASE_URL}/api/projects/${id}`, authHeader());
            setAlert({ type: 'success', msg: 'Project deleted!' });
            fetchProjects();
        } catch {
            setAlert({ type: 'error', msg: 'Failed to delete project.' });
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                <Box>
                    <Typography sx={{ color: '#f1f5f9', fontSize: 24, fontWeight: 700 }}>Projects</Typography>
                    <Typography sx={{ color: '#64748b', fontSize: 14 }}>Manage your portfolio projects.</Typography>
                </Box>
                <Button onClick={openAdd} startIcon={<AddIcon />} variant="contained"
                    sx={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '8px' }}>
                    Add Project
                </Button>
            </Box>

            {alert && <Alert severity={alert.type} sx={{ mb: 2 }} onClose={() => setAlert(null)}>{alert.msg}</Alert>}

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress sx={{ color: '#6366f1' }} /></Box>
            ) : (
                <Grid container spacing={2.5}>
                    {projects.map(p => (
                        <Grid item xs={12} sm={6} lg={4} key={p._id}>
                            <Card sx={{ bgcolor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                {p.imageUrl && (
                                    <CardMedia component="img" height={160}
                                        image={p.imageUrl}
                                        alt={p.title}
                                        sx={{ objectFit: 'cover' }}
                                        onError={e => { e.target.style.display = 'none'; }}
                                    />
                                )}
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography sx={{ color: '#e2e8f0', fontWeight: 700, mb: 0.5 }}>{p.title}</Typography>
                                    <Typography sx={{ color: '#64748b', fontSize: 13, mb: 1.5 }}>{p.description.substring(0, 100)}...</Typography>
                                    <Chip label={p.techStack} size="small"
                                        sx={{ bgcolor: 'rgba(99,102,241,0.15)', color: '#c7d2fe', fontSize: 10 }} />
                                </CardContent>
                                <CardActions sx={{ px: 2, pb: 2, pt: 0, display: 'flex', justifyContent: 'space-between' }}>
                                    <Box>
                                        {p.liveUrl && <IconButton size="small" href={p.liveUrl} target="_blank" sx={{ color: '#4ade80', mr: 0.5 }}><OpenInNewIcon fontSize="small" /></IconButton>}
                                        {p.githubUrl && <IconButton size="small" href={p.githubUrl} target="_blank" sx={{ color: '#94a3b8' }}><GitHubIcon fontSize="small" /></IconButton>}
                                    </Box>
                                    <Box>
                                        <IconButton onClick={() => openEdit(p)} size="small" sx={{ color: '#818cf8', mr: 0.5 }}><EditIcon fontSize="small" /></IconButton>
                                        <IconButton onClick={() => handleDelete(p._id)} size="small" sx={{ color: '#ef4444' }}><DeleteIcon fontSize="small" /></IconButton>
                                    </Box>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Dialog */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth
                PaperProps={{ sx: { bgcolor: '#1e293b', border: '1px solid #334155', borderRadius: '12px' } }}>
                <DialogTitle sx={{ color: '#f1f5f9' }}>{editing ? 'Edit Project' : 'Add New Project'}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 0.5 }}>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} sx={inputSx} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Tech Stack" value={form.techStack} onChange={e => setForm({ ...form, techStack: e.target.value })} sx={inputSx} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Short Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} multiline rows={2} sx={inputSx} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Overview (expanded)" value={form.overview} onChange={e => setForm({ ...form, overview: e.target.value })} multiline rows={3} sx={inputSx} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Image URL" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://..." sx={inputSx} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Live URL" value={form.liveUrl} onChange={e => setForm({ ...form, liveUrl: e.target.value })} sx={inputSx} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="GitHub URL" value={form.githubUrl} onChange={e => setForm({ ...form, githubUrl: e.target.value })} sx={inputSx} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth label="Order" type="number" value={form.order} onChange={e => setForm({ ...form, order: parseInt(e.target.value) })} sx={inputSx} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => setDialogOpen(false)} sx={{ color: '#64748b' }}>Cancel</Button>
                    <Button onClick={handleSave} variant="contained" disabled={saving}
                        startIcon={saving ? <CircularProgress size={16} /> : <SaveIcon />}
                        sx={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '8px' }}>
                        {saving ? 'Saving...' : 'Save Project'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminProjects;
