// File: client/src/context/AuthContext.jsx (Corrected)

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  // --- THIS IS THE UPDATED FUNCTION ---
  const login = async (email, password) => {
    try {
      const { data } = await axios.post('/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      navigate('/');
    } catch (err) {
      // --- THIS IS THE NEW, ROBUST ERROR HANDLING ---
      if (err.response) {
        // The server responded with a status code (e.g., 401, 500)
        throw new Error(err.response.data.message || 'Login failed');
      } else if (err.request) {
        // The request was made but no response was received
        // This is the "Render server is asleep" problem
        throw new Error('Server is not responding. Please try again in 30 seconds.');
      } else {
        // Something else happened (e.g., network error)
        throw new Error(err.message || 'An unknown error occurred');
      }
    }
  };
  // --- END OF UPDATED FUNCTION ---

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    navigate('/login');
  };

  const value = {
    user,
    setUser,
    login,
    logout,
    isAuthenticated: !!user,
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}