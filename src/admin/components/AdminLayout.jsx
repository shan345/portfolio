import React, { useState } from 'react';
import {
    Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
    AppBar, Toolbar, Typography, IconButton, Avatar, Chip, Divider, Tooltip
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HeroIcon from '@mui/icons-material/MovieFilter';
import PersonIcon from '@mui/icons-material/Person';
import CodeIcon from '@mui/icons-material/Code';
import FolderIcon from '@mui/icons-material/Folder';
import MailIcon from '@mui/icons-material/Mail';
import LinkIcon from '@mui/icons-material/Link';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

const DRAWER_WIDTH = 260;

const NAV_ITEMS = [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { label: 'Hero Section', icon: <HeroIcon />, path: '/admin/hero' },
    { label: 'About', icon: <PersonIcon />, path: '/admin/about' },
    { label: 'Skills', icon: <CodeIcon />, path: '/admin/skills' },
    { label: 'Projects', icon: <FolderIcon />, path: '/admin/projects' },
    { label: 'Messages', icon: <MailIcon />, path: '/admin/messages' },
    { label: 'Social Links', icon: <LinkIcon />, path: '/admin/social' },
];

const AdminLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { adminUser, logout } = useAdmin();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const drawerContent = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#0f172a' }}>
            {/* Logo */}
            <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{
                    width: 40, height: 40, borderRadius: '10px',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <Typography sx={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>S</Typography>
                </Box>
                <Box>
                    <Typography sx={{ color: '#f1f5f9', fontWeight: 700, fontSize: 16, lineHeight: 1 }}>Shan Admin</Typography>
                    <Typography sx={{ color: '#64748b', fontSize: 11 }}>Portfolio Manager</Typography>
                </Box>
            </Box>

            <Divider sx={{ borderColor: '#1e293b' }} />

            {/* Nav Items */}
            <List sx={{ px: 1.5, py: 2, flexGrow: 1 }}>
                {NAV_ITEMS.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                onClick={() => { navigate(item.path); setMobileOpen(false); }}
                                sx={{
                                    borderRadius: '10px',
                                    px: 2, py: 1.2,
                                    bgcolor: isActive ? 'rgba(99,102,241,0.15)' : 'transparent',
                                    border: isActive ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
                                    '&:hover': { bgcolor: 'rgba(99,102,241,0.08)' },
                                    transition: 'all 0.2s'
                                }}
                            >
                                <ListItemIcon sx={{ color: isActive ? '#818cf8' : '#475569', minWidth: 38 }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{
                                        fontSize: 14, fontWeight: isActive ? 600 : 400,
                                        color: isActive ? '#e2e8f0' : '#94a3b8'
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            <Divider sx={{ borderColor: '#1e293b' }} />

            {/* User Info & Logout */}
            <Box sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                    <Avatar sx={{ width: 36, height: 36, bgcolor: '#6366f1', fontSize: 14 }}>
                        {adminUser?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography sx={{ color: '#e2e8f0', fontSize: 13, fontWeight: 600 }}>{adminUser}</Typography>
                        <Chip label="Admin" size="small" sx={{ height: 16, fontSize: 10, bgcolor: 'rgba(99,102,241,0.2)', color: '#818cf8' }} />
                    </Box>
                    <Tooltip title="Logout">
                        <IconButton onClick={handleLogout} size="small" sx={{ color: '#ef4444' }}>
                            <LogoutIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#0f172a' }}>
            {/* Desktop Sidebar */}
            <Drawer
                variant="permanent"
                sx={{
                    width: DRAWER_WIDTH,
                    flexShrink: 0,
                    display: { xs: 'none', md: 'block' },
                    '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box', border: 'none', borderRight: '1px solid #1e293b' }
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Mobile Sidebar */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: DRAWER_WIDTH } }}
            >
                {drawerContent}
            </Drawer>

            {/* Main */}
            <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                {/* TopBar */}
                <AppBar position="static" elevation={0}
                    sx={{ bgcolor: '#0f172a', borderBottom: '1px solid #1e293b' }}>
                    <Toolbar sx={{ minHeight: '60px !important' }}>
                        <IconButton onClick={() => setMobileOpen(true)} sx={{ display: { md: 'none' }, color: '#94a3b8', mr: 1 }}>
                            <MenuIcon />
                        </IconButton>
                        <Box sx={{ flexGrow: 1 }} />
                        <Chip
                            label="Live Admin"
                            size="small"
                            sx={{ bgcolor: 'rgba(34,197,94,0.15)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)' }}
                        />
                    </Toolbar>
                </AppBar>

                {/* Page Content */}
                <Box sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, overflow: 'auto' }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default AdminLayout;
