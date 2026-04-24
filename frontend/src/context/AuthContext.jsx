import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

// Admin hardcoded credentials
const ADMIN_EMAIL = 'admin@malibu.com';
const ADMIN_PASSWORD = 'adminmalibu';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('nivis_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch { /* ignore */ }
    }
    setLoading(false);
  }, []);

  // loginUser accepts the full user data object (from API response or admin)
  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('nivis_user', JSON.stringify(userData));
    if (userData.token) {
      localStorage.setItem('nivis_token', userData.token);
    }
  };

  // Admin login (frontend-only, no backend call needed)
  const loginAdmin = (email, password) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser = {
        _id: 'admin-local',
        name: 'Administrador',
        email: ADMIN_EMAIL,
        role: 'admin',
        token: 'admin-local-token',
      };
      loginUser(adminUser);
      return adminUser;
    }
    return null;
  };

  const logout = () => {
    localStorage.removeItem('nivis_token');
    localStorage.removeItem('nivis_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, loginAdmin, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
