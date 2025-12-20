import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axiosConfig';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      api.get('/auth/user')
        .then(res => setUser(res.data))
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const res = await api.post('/auth/login', { username, password });
      let rawToken = res.data.jwtToken;

      if (rawToken && rawToken.includes('=')) rawToken = rawToken.split('=')[1];
      if (rawToken && rawToken.includes(';')) rawToken = rawToken.split(';')[0];
      if (!rawToken) return null;

      localStorage.setItem('jwtToken', rawToken);
      const { jwtToken, ...userData } = res.data;
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Login failed", error);
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setUser(null);
    api.post('/auth/signout');
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading User...</div>;

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);