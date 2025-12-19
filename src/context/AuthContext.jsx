import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axiosConfig';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is already logged in on refresh
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            // Option 1: Decode JWT here if it contains user info
            // Option 2: Fetch user info from API (Preferred based on your spec)
            api.get('/auth/user')
                .then(res => setUser(res.data))
                .catch(() => logout()) // Token invalid
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    // src/context/AuthContext.jsx

    const login = async (username, password) => {
        try {
            const res = await api.post('/auth/login', { username, password });

            console.log("LOGIN RESPONSE:", res.data);

            // 1. Get the raw string
            let rawToken = res.data.jwtToken;

            // 2. CLEAN THE TOKEN
            // The token looks like: "tranphuclong=eyJ...; Path=..."
            // We want the part BETWEEN the first '=' and the first ';'
            if (rawToken && rawToken.includes('=')) {
                // Split by '=' and take the second part (the token start)
                rawToken = rawToken.split('=')[1];
            }
            if (rawToken && rawToken.includes(';')) {
                // Split by ';' and take the first part (the token end)
                rawToken = rawToken.split(';')[0];
            }

            // Now 'rawToken' should be just "eyJ..."
            console.log("Cleaned Token:", rawToken);

            if (!rawToken) {
                console.error("Failed to parse token");
                return false;
            }

            // 3. Save the clean token
            localStorage.setItem('jwtToken', rawToken);

            // 4. Save user data (excluding the token field)
            const { jwtToken, ...userData } = res.data;
            setUser(userData);

            return true;
        } catch (error) {
            console.error("Login failed", error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        setUser(null);
        api.post('/auth/signout'); // Optional backend signout
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);