import React, { useEffect, useState } from 'react';
import {
    Box, Typography, Card, TextField, Button, CircularProgress,
    Alert, IconButton, Table, TableBody, TableCell, TableHead,
    TableRow, Dialog, DialogTitle, DialogContent, DialogActions,
    Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
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
    '& .MuiSelect-icon': { color: '#64748b' }
};

const defaultSkill = { name: '', gridSize: 6, order: 0 };

const AdminSkills = () => {
    const { authHeader } = useAdmin();
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(defaultSkill);
    const [saving, setSaving] = useState(false);
    const [alert, setAlert] = useState(null);

    const fetchSkills = () => {
        axios.get(`${API_BASE_URL}/api/skills`)
            .then(res => setSkills(res.data))
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchSkills(); }, []);

    const openAdd = () => { setForm(defaultSkill); setEditing(null); setDialogOpen(true); };
    const openEdit = (skill) => { setForm({ name: skill.name, gridSize: skill.gridSize, order: skill.order }); setEditing(skill._id); setDialogOpen(true); };

    const handleSave = async () => {
        setSaving(true);
        try {
            if (editing) {
                await axios.put(`${API_BASE_URL}/api/skills/${editing}`, form, authHeader());
            } else {
                await axios.post(`${API_BASE_URL}/api/skills`, form, authHeader());
            }
            setDialogOpen(false);
            setAlert({ type: 'success', msg: editing ? 'Skill updated!' : 'Skill added!' });
            fetchSkills();
        } catch {
            setAlert({ type: 'error', msg: 'Failed to save skill.' });
        } finally { setSaving(false); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this skill?')) return;
        try {
            await axios.delete(`${API_BASE_URL}/api/skills/${id}`, authHeader());
            setAlert({ type: 'success', msg: 'Skill deleted!' });
            fetchSkills();
        } catch {
            setAlert({ type: 'error', msg: 'Failed to delete.' });
        }
    };

    const tableCellSx = { color: '#94a3b8', borderBottom: '1px solid #1e293b' };
    const tableHeadSx = { color: '#64748b', borderBottom: '1px solid #334155', fontWeight: 700, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase' };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                <Box>
                    <Typography sx={{ color: '#f1f5f9', fontSize: 24, fontWeight: 700 }}>Skills</Typography>
                    <Typography sx={{ color: '#64748b', fontSize: 14 }}>Manage your technical skills list.</Typography>
                </Box>
                <Button onClick={openAdd} startIcon={<AddIcon />} variant="contained"
                    sx={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '8px' }}>
                    Add Skill
                </Button>
            </Box>

            {alert && <Alert severity={alert.type} sx={{ mb: 2 }} onClose={() => setAlert(null)}>{alert.msg}</Alert>}

            <Card sx={{ bgcolor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', overflow: 'auto' }}>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress sx={{ color: '#6366f1' }} /></Box>
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={tableHeadSx}>Skill Name</TableCell>
                                <TableCell sx={tableHeadSx}>Grid Size (xs)</TableCell>
                                <TableCell sx={tableHeadSx}>Order</TableCell>
                                <TableCell sx={{ ...tableHeadSx, textAlign: 'right' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {skills.map(skill => (
                                <TableRow key={skill._id} sx={{ '&:hover': { bgcolor: 'rgba(99,102,241,0.05)' } }}>
                                    <TableCell sx={tableCellSx}><Typography sx={{ color: '#e2e8f0', fontWeight: 500 }}>{skill.name}</Typography></TableCell>
                                    <TableCell sx={tableCellSx}>{skill.gridSize}</TableCell>
                                    <TableCell sx={tableCellSx}>{skill.order}</TableCell>
                                    <TableCell sx={{ ...tableCellSx, textAlign: 'right' }}>
                                        <IconButton onClick={() => openEdit(skill)} size="small" sx={{ color: '#818cf8', mr: 1 }}><EditIcon fontSize="small" /></IconButton>
                                        <IconButton onClick={() => handleDelete(skill._id)} size="small" sx={{ color: '#ef4444' }}><DeleteIcon fontSize="small" /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </Card>

            {/* Dialog */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} PaperProps={{ sx: { bgcolor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', minWidth: 360 } }}>
                <DialogTitle sx={{ color: '#f1f5f9' }}>{editing ? 'Edit Skill' : 'Add Skill'}</DialogTitle>
                <DialogContent>
                    <TextField fullWidth label="Skill Name" value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        sx={{ ...inputSx, mb: 2, mt: 1 }} />
                    <FormControl fullWidth sx={{ ...inputSx, mb: 2 }}>
                        <InputLabel>Grid Size (1-12)</InputLabel>
                        <Select value={form.gridSize} label="Grid Size (1-12)"
                            onChange={e => setForm({ ...form, gridSize: e.target.value })}
                            sx={{ color: '#e2e8f0' }}>
                            {[2, 3, 4, 5, 6, 7, 8, 9, 10, 12].map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <TextField fullWidth label="Order" type="number" value={form.order}
                        onChange={e => setForm({ ...form, order: parseInt(e.target.value) })}
                        sx={inputSx} />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => setDialogOpen(false)} sx={{ color: '#64748b' }}>Cancel</Button>
                    <Button onClick={handleSave} variant="contained" disabled={saving}
                        startIcon={saving ? <CircularProgress size={16} /> : <SaveIcon />}
                        sx={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '8px' }}>
                        {saving ? 'Saving...' : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminSkills;
