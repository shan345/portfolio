import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, Typography, Skeleton, Chip } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import CodeIcon from '@mui/icons-material/Code';
import MailIcon from '@mui/icons-material/Mail';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import axios from 'axios';
import API_BASE_URL from '../../config/api';
import { useAdmin } from '../context/AdminContext';

const StatCard = ({ icon, label, value, color, loading }) => (
    <Card sx={{
        p: 3, bgcolor: '#1e293b', border: '1px solid #334155', borderRadius: '12px',
        display: 'flex', alignItems: 'center', gap: 2,
        transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-2px)' }
    }}>
        <Box sx={{
            width: 52, height: 52, borderRadius: '12px',
            bgcolor: `${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <Box sx={{ color }}>{icon}</Box>
        </Box>
        <Box>
            <Typography sx={{ color: '#64748b', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</Typography>
            {loading ? <Skeleton width={40} sx={{ bgcolor: '#334155' }} /> :
                <Typography sx={{ color: '#f1f5f9', fontSize: 28, fontWeight: 700, lineHeight: 1.2 }}>{value}</Typography>}
        </Box>
    </Card>
);

const AdminDashboard = () => {
    const { authHeader } = useAdmin();
    const [stats, setStats] = useState({ projects: 0, skills: 0, messages: 0, unread: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [projRes, skillRes, msgRes] = await Promise.all([
                    axios.get(`${API_BASE_URL}/api/projects`),
                    axios.get(`${API_BASE_URL}/api/skills`),
                    axios.get(`${API_BASE_URL}/api/contacts`, authHeader())
                ]);
                setStats({
                    projects: projRes.data.length,
                    skills: skillRes.data.length,
                    messages: msgRes.data.length,
                    unread: msgRes.data.filter(m => !m.read).length
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [authHeader]);

    const cards = [
        { icon: <FolderIcon />, label: 'Projects', value: stats.projects, color: '#6366f1' },
        { icon: <CodeIcon />, label: 'Skills', value: stats.skills, color: '#8b5cf6' },
        { icon: <MailIcon />, label: 'Total Messages', value: stats.messages, color: '#06b6d4' },
        { icon: <MarkunreadIcon />, label: 'Unread', value: stats.unread, color: '#f59e0b' },
    ];

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography sx={{ color: '#f1f5f9', fontSize: 26, fontWeight: 700 }}>Dashboard</Typography>
                <Typography sx={{ color: '#64748b', fontSize: 14, mt: 0.5 }}>Welcome back! Here's your portfolio overview.</Typography>
            </Box>
            <Grid container spacing={2.5}>
                {cards.map(c => (
                    <Grid item xs={12} sm={6} lg={3} key={c.label}>
                        <StatCard {...c} loading={loading} />
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ mt: 4, p: 3, bgcolor: '#1e293b', border: '1px solid #334155', borderRadius: '12px' }}>
                <Typography sx={{ color: '#94a3b8', fontSize: 14 }}>
                    💡 <strong style={{ color: '#e2e8f0' }}>Quick Tips</strong> — Use the sidebar to manage all portfolio sections. Changes reflect on the live portfolio immediately.
                </Typography>
            </Box>
        </Box>
    );
};

export default AdminDashboard;
