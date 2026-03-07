import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config/api';

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('adminToken'));
    const [adminUser, setAdminUser] = useState(() => localStorage.getItem('adminUser'));

    const login = async (username, password) => {
        const res = await axios.post(`${API_BASE_URL}/api/auth/login`, { username, password });
        localStorage.setItem('adminToken', res.data.token);
        localStorage.setItem('adminUser', res.data.username);
        setToken(res.data.token);
        setAdminUser(res.data.username);
        return res.data;
    };

    const logout = useCallback(() => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        setToken(null);
        setAdminUser(null);
    }, []);

    const authHeader = useCallback(() => ({
        headers: { Authorization: `Bearer ${token}` }
    }), [token]);

    return (
        <AdminContext.Provider value={{ token, adminUser, login, logout, authHeader, isAuthenticated: !!token }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => useContext(AdminContext);
