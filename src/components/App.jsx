import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import { Box, ThemeProvider } from '@mui/material';
import theme from "./ui/Theme";

// Admin imports
import { AdminProvider } from "../admin/context/AdminContext";
import ProtectedRoute from "../admin/components/ProtectedRoute";
import AdminLayout from "../admin/components/AdminLayout";
import AdminLogin from "../admin/pages/AdminLogin";
import AdminDashboard from "../admin/pages/AdminDashboard";
import AdminHero from "../admin/pages/AdminHero";
import AdminAbout from "../admin/pages/AdminAbout";
import AdminSkills from "../admin/pages/AdminSkills";
import AdminProjects from "../admin/pages/AdminProjects";
import AdminMessages from "../admin/pages/AdminMessages";
import AdminSocial from "../admin/pages/AdminSocial";

function App() {
    return (
        <AdminProvider>
            <BrowserRouter>
                <Routes>
                    {/* Portfolio Home */}
                    <Route path="/" element={
                        <ThemeProvider theme={theme}>
                            <Box bgcolor={"background.default"}>
                                <Home />
                            </Box>
                        </ThemeProvider>
                    } />

                    {/* Admin Login (public) */}
                    <Route path="/admin/login" element={<AdminLogin />} />

                    {/* Admin Protected Routes */}
                    <Route path="/admin/*" element={
                        <ProtectedRoute>
                            <AdminLayout>
                                <Routes>
                                    <Route index element={<Navigate to="dashboard" replace />} />
                                    <Route path="dashboard" element={<AdminDashboard />} />
                                    <Route path="hero" element={<AdminHero />} />
                                    <Route path="about" element={<AdminAbout />} />
                                    <Route path="skills" element={<AdminSkills />} />
                                    <Route path="projects" element={<AdminProjects />} />
                                    <Route path="messages" element={<AdminMessages />} />
                                    <Route path="social" element={<AdminSocial />} />
                                </Routes>
                            </AdminLayout>
                        </ProtectedRoute>
                    } />
                </Routes>
            </BrowserRouter>
        </AdminProvider>
    );
}

export default App;