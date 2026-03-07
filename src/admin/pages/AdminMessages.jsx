import React, { useEffect, useState } from 'react';
import {
    Box, Typography, Card, CardContent, Grid, Button, CircularProgress,
    Alert, IconButton, Chip, Divider, Badge, Tooltip
} from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteIcon from '@mui/icons-material/Delete';
import MailIcon from '@mui/icons-material/Mail';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import axios from 'axios';
import API_BASE_URL from '../../config/api';
import { useAdmin } from '../context/AdminContext';

const AdminMessages = () => {
    const { authHeader } = useAdmin();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(null);

    const fetchMessages = () => {
        axios.get(`${API_BASE_URL}/api/contacts`, authHeader())
            .then(res => setMessages(res.data))
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchMessages(); }, []);

    const markRead = async (id) => {
        try {
            await axios.put(`${API_BASE_URL}/api/contacts/${id}/read`, {}, authHeader());
            setMessages(msgs => msgs.map(m => m._id === id ? { ...m, read: true } : m));
        } catch {
            setAlert({ type: 'error', msg: 'Failed to mark as read.' });
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this message?')) return;
        try {
            await axios.delete(`${API_BASE_URL}/api/contacts/${id}`, authHeader());
            setMessages(msgs => msgs.filter(m => m._id !== id));
            setAlert({ type: 'success', msg: 'Message deleted.' });
        } catch {
            setAlert({ type: 'error', msg: 'Failed to delete message.' });
        }
    };

    const unreadCount = messages.filter(m => !m.read).length;

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Typography sx={{ color: '#f1f5f9', fontSize: 24, fontWeight: 700 }}>Messages</Typography>
                        {unreadCount > 0 && (
                            <Chip label={`${unreadCount} unread`} size="small"
                                sx={{ bgcolor: 'rgba(245,158,11,0.15)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)' }} />
                        )}
                    </Box>
                    <Typography sx={{ color: '#64748b', fontSize: 14 }}>Contact form submissions from your portfolio.</Typography>
                </Box>
            </Box>

            {alert && <Alert severity={alert.type} sx={{ mb: 2 }} onClose={() => setAlert(null)}>{alert.msg}</Alert>}

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress sx={{ color: '#6366f1' }} /></Box>
            ) : messages.length === 0 ? (
                <Card sx={{ p: 6, bgcolor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', textAlign: 'center' }}>
                    <MailIcon sx={{ fontSize: 48, color: '#334155', mb: 2 }} />
                    <Typography sx={{ color: '#64748b' }}>No messages yet</Typography>
                </Card>
            ) : (
                <Grid container spacing={2}>
                    {messages.map(msg => (
                        <Grid item xs={12} md={6} key={msg._id}>
                            <Card sx={{
                                bgcolor: '#1e293b',
                                border: `1px solid ${msg.read ? '#334155' : 'rgba(99,102,241,0.4)'}`,
                                borderRadius: '12px',
                                transition: 'all 0.2s',
                                '&:hover': { borderColor: '#475569' }
                            }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                        <Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography sx={{ color: '#e2e8f0', fontWeight: 700, fontSize: 15 }}>{msg.name}</Typography>
                                                {!msg.read && <Chip label="New" size="small" sx={{ height: 18, fontSize: 10, bgcolor: 'rgba(99,102,241,0.2)', color: '#818cf8' }} />}
                                            </Box>
                                            <Typography sx={{ color: '#6366f1', fontSize: 13 }}>{msg.email}</Typography>
                                        </Box>
                                        <Typography sx={{ color: '#475569', fontSize: 11 }}>
                                            {new Date(msg.receivedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </Typography>
                                    </Box>
                                    <Divider sx={{ borderColor: '#334155', my: 1 }} />
                                    <Typography sx={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{msg.message}</Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                                        {!msg.read && (
                                            <Tooltip title="Mark as read">
                                                <IconButton size="small" onClick={() => markRead(msg._id)} sx={{ color: '#4ade80' }}>
                                                    <MarkEmailReadIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                        <Tooltip title="Delete">
                                            <IconButton size="small" onClick={() => handleDelete(msg._id)} sx={{ color: '#ef4444' }}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default AdminMessages;
