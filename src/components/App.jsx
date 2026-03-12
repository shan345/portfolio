import React, { Suspense, lazy } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import { Box, ThemeProvider, CircularProgress } from '@mui/material';
import theme from "./ui/Theme";

// Admin imports
import { AdminProvider } from "../admin/context/AdminContext";
import ProtectedRoute from "../admin/components/ProtectedRoute";

// Lazy-loaded admin pages (code-split — downloaded only when user visits /admin)
const AdminLayout     = lazy(() => import("../admin/components/AdminLayout"));
const AdminLogin      = lazy(() => import("../admin/pages/AdminLogin"));
const AdminDashboard  = lazy(() => import("../admin/pages/AdminDashboard"));
const AdminHero       = lazy(() => import("../admin/pages/AdminHero"));
const AdminAbout      = lazy(() => import("../admin/pages/AdminAbout"));
const AdminSkills     = lazy(() => import("../admin/pages/AdminSkills"));
const AdminProjects   = lazy(() => import("../admin/pages/AdminProjects"));
const AdminMessages   = lazy(() => import("../admin/pages/AdminMessages"));
const AdminSocial     = lazy(() => import("../admin/pages/AdminSocial"));

// Full-screen spinner shown while any lazy admin chunk is loading
const AdminFallback = () => (
    <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        bgcolor="#060509"
    >
        <CircularProgress size={48} sx={{ color: "#80A8EB" }} />
    </Box>
);

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
                    <Route path="/admin/login" element={
                        <Suspense fallback={<AdminFallback />}>
                            <AdminLogin />
                        </Suspense>
                    } />

                    {/* Admin Protected Routes */}
                    <Route path="/admin/*" element={
                        <ProtectedRoute>
                            <Suspense fallback={<AdminFallback />}>
                                <AdminLayout>
                                    <Routes>
                                        <Route index element={<Navigate to="dashboard" replace />} />
                                        <Route path="dashboard" element={<AdminDashboard />} />
                                        <Route path="hero"      element={<AdminHero />} />
                                        <Route path="about"     element={<AdminAbout />} />
                                        <Route path="skills"    element={<AdminSkills />} />
                                        <Route path="projects"  element={<AdminProjects />} />
                                        <Route path="messages"  element={<AdminMessages />} />
                                        <Route path="social"    element={<AdminSocial />} />
                                    </Routes>
                                </AdminLayout>
                            </Suspense>
                        </ProtectedRoute>
                    } />
                </Routes>
            </BrowserRouter>
        </AdminProvider>
    );
}

export default App;