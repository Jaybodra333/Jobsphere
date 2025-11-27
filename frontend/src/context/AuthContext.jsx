import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/client';

const AuthContext = createContext(null);

const STORAGE_KEY = 'job-portal-auth';
const TOKEN_KEY = 'job-portal-token';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const persistedAuth = localStorage.getItem(STORAGE_KEY);
    const persistedToken = localStorage.getItem(TOKEN_KEY);
    if (persistedAuth && persistedToken) {
      setUser(JSON.parse(persistedAuth));
      setToken(persistedToken);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setError('');
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data.user));
      localStorage.setItem(TOKEN_KEY, data.token);
      return data.user;
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Unable to login');
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(TOKEN_KEY);
  };

  const value = {
    user,
    token,
    login,
    logout,
    loading,
    error,
    isAuthenticated: Boolean(user && token),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};

