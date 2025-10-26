// File: client/src/context/AuthContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// 1. Create the Context
const AuthContext = createContext();

// 2. Create the Provider (a component that "provides" the context)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To check initial auth status
  const navigate = useNavigate();

  // 3. Check if user is already logged in (on app start)
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
      // Set the token for all future axios requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  // 4. Login Function
  const login = async (email, password) => {
    try {
      const { data } = await axios.post('/api/auth/login', {
        email,
        password,
      });

      // Save token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);

      // Set default auth header for axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

      // Redirect to home or dashboard
      navigate('/');
    } catch (err) {
      throw new Error(err.response.data.message || 'Login failed');
    }
  };

  // 5. Logout Function
  const logout = () => {
    // Remove token and user data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);

    // Remove auth header
    delete axios.defaults.headers.common['Authorization'];

    // Redirect to login
    navigate('/login');
  };

  // 6. Value to be "provided" to all components
  const value = {
    user,
    setUser,
    login,
    logout,
    isAuthenticated: !!user, // A simple boolean: true if user is not null
  };

  // Don't render the app until we've checked for a token
  if (loading) {
    return <h1>Loading...</h1>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 7. Create a custom hook to easily use the context
export function useAuth() {
  return useContext(AuthContext);
}