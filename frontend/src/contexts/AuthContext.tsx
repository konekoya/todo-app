import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, userAPI, UserSettings } from '../services/api';

interface User {
  id: string;
  email: string;
  themePreference: 'light' | 'dark';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateTheme: (theme: 'light' | 'dark') => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const settings = await userAPI.getSettings();
          setUser(settings);
          // Apply theme to document
          document.body.className =
            settings.themePreference === 'dark' ? 'dark-theme' : '';
        } catch (error) {
          console.error('Failed to fetch user:', error);
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, [token]);

  // Apply theme whenever user changes
  useEffect(() => {
    if (user) {
      document.body.className =
        user.themePreference === 'dark' ? 'dark-theme' : '';
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    const data = await authAPI.login(email, password);
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const signup = async (email: string, password: string) => {
    const data = await authAPI.signup(email, password);
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const updateTheme = async (theme: 'light' | 'dark') => {
    const updatedUser = await userAPI.updateSettings(theme);
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, signup, logout, updateTheme, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
