import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Use environment variable for API base URL — set VITE_API_URL in .env / Netlify env vars
const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('token') || null;
    } catch {
      return null;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user') || localStorage.getItem('bst_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Synchronize token & user state with localStorage & handle Google OAuth URL parameters
  useEffect(() => {
    // Check for Google OAuth callback parameters in URL
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get('token');
    const urlUserStr = params.get('user');

    if (urlToken && urlUserStr) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(urlUserStr));
        localStorage.setItem('token', urlToken);
        localStorage.setItem('user', JSON.stringify(parsedUser));
        setToken(urlToken);
        setUser(parsedUser);
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (err) {
        console.error('Error handling Google Auth parameters:', err);
      }
    }
  }, []);

  // Update localStorage when token or user state changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('bst_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('bst_user');
    }
  }, [token, user]);

  // Login User via Backend API
  const login = async (credentials) => {
    setLoading(true);
    setError('');

    const payload = typeof credentials === 'object' ? credentials : { email: credentials, password: '' };

    try {
      const response = await axios.post(`${BACKEND_URL}/auth/login`, payload);
      const { token: newToken, user: userData } = response.data;

      if (newToken) {
        setToken(newToken);
        localStorage.setItem('token', newToken);
      }
      if (userData) {
        // Map user object fields for compatibility (first_name / name, role)
        const formattedUser = {
          id: userData.id || userData._id,
          name: userData.first_name
            ? `${userData.first_name} ${userData.last_name || ''}`.trim()
            : (userData.name || payload.email.split('@')[0]),
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          role: userData.role === 'admin' ? 'admin' : (payload.email === 'admin@bookshelf.com' ? 'admin' : 'user')
        };
        setUser(formattedUser);
        localStorage.setItem('user', JSON.stringify(formattedUser));
        return { success: true, user: formattedUser, token: newToken };
      }

      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid credentials. Please try again.';
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  // Register User via Backend API
  const register = async (registerData) => {
    setLoading(true);
    setError('');

    // Normalize form fields for AuthController backend
    // Always use object form — arrow functions don't have 'arguments'
    let payload;
    if (typeof registerData === 'object' && registerData !== null) {
      payload = {
        first_name: registerData.first_name || registerData.firstName || registerData.name?.split(' ')[0] || 'User',
        last_name: registerData.last_name || registerData.lastName || registerData.name?.split(' ').slice(1).join(' ') || '',
        email: registerData.email,
        password: registerData.password,
        confirm_password: registerData.confirm_password || registerData.confirmPassword || registerData.password,
        accept_terms: registerData.accept_terms !== undefined ? registerData.accept_terms : true
      };
    } else {
      // Fallback: registerData is the name (string), not supported — return error
      console.error('register() requires an object argument');
      setLoading(false);
      return { success: false, message: 'Registration error. Please try again.' };
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/auth/register`, payload);
      return { success: true, data: response.data };
    } catch (err) {
      const msg = err.response?.data?.message || 'Error registering user';
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('bst_user');
  };

  // Helper for Authorization Headers
  const getAuthHeaders = () => {
    const activeToken = token || localStorage.getItem('token');
    return activeToken ? { Authorization: `Bearer ${activeToken}` } : {};
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, error, setError, login, register, logout, getAuthHeaders, BACKEND_URL }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
