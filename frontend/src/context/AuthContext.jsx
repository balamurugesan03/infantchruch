import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem('church_admin_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await authService.login({ email, password });
      localStorage.setItem('church_admin_token', data.token);
      localStorage.setItem('church_admin_user', JSON.stringify(data.admin));
      setAdmin(data.admin);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('church_admin_token');
    localStorage.removeItem('church_admin_user');
    setAdmin(null);
  };

  const isAuthenticated = !!admin && !!localStorage.getItem('church_admin_token');

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
