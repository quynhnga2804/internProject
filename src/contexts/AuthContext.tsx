import React, { createContext, useContext, useEffect, useState } from 'react'
import { refreshToken } from '../utils/auth'
import { refreshAccessToken, logout as apiLogout } from '../services/api';

type AuthContextType = {
  accessToken: string | null;
  username: string | null;
  login: (token: string, username: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('accessToken')
  );

  const [username, setUsername] = useState<string | null>(
    localStorage.getItem('username')
  );

  const login = (token: string, username: string) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('username', username);
    setAccessToken(token);
    setUsername(username);
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch { }
    localStorage.clear();
    setAccessToken(null);
    setUsername(null);
  };


  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const newAccessToken = await refreshToken();
        if (newAccessToken) setAccessToken(newAccessToken);
      } catch (error) {
        console.error('Refresh token failed:', error);
        logout();
      }
    }, 60 * 1000); // 1 phút

    return () => clearInterval(interval);
  }, []);


  return (
    <AuthContext.Provider value={{ accessToken, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
