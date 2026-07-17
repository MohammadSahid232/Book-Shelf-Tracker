import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

const BACKEND_URL = 'http://localhost:5000';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('bst_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Persist user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('bst_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('bst_user');
    }
  }, [user]);

  // Login — client-side simulation with single active admin check
  const login = async (email, password) => {
    setLoading(true);
    setError('');
    
    // Simulate slight loading delay for professional feel
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const normalizedEmail = email.toLowerCase().trim();

      // --- Admin login ---
      if (normalizedEmail === 'admin@bookshelf.com') {
        if (password !== 'admin123') {
          const msg = 'Invalid admin credentials';
          setError(msg);
          return { success: false, message: msg };
        }
        
        // Single admin session validation via localStorage
        const adminActive = localStorage.getItem('bst_admin_active');
        if (adminActive === 'true') {
          const msg = 'Admin is already logged in from another session. Only one active session is allowed.';
          setError(msg);
          return { success: false, message: msg };
        }

        localStorage.setItem('bst_admin_active', 'true');
        const adminUser = { name: 'Admin', email: 'admin@bookshelf.com', role: 'admin' };
        setUser(adminUser);
        return { success: true, role: 'admin' };
      }

      // --- Customer login ---
      const customerUser = {
        name: normalizedEmail.split('@')[0],
        email: normalizedEmail,
        role: 'customer'
      };
      setUser(customerUser);
      return { success: true, role: 'customer' };

    } catch (err) {
      const msg = 'Login failed. Please try again.';
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  // Register — calls the backend simulated registration API to validate input
  const register = async (name, email, password, confirmPassword) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${BACKEND_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          password,
          confirmPassword,
          firstName: name,
          lastName: ''
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        // Extract validation errors from express-validator response
        const errorMsg = data.errors ? data.errors.map(err => err.msg).join(', ') : (data.message || 'Registration failed');
        setError(errorMsg);
        return { success: false, message: errorMsg };
      }
      return { success: true };
    } catch (err) {
      const msg = 'Cannot connect to server. Is the backend running?';
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    if (user?.role === 'admin') {
      localStorage.removeItem('bst_admin_active');
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, setError, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
