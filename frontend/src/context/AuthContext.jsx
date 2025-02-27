import React, { createContext, useState, useEffect, useContext } from 'react';
import * as api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const { data } = await api.getUserProfile();
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        localStorage.removeItem('token'); // Clear token if invalid
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const login = async (userData) => {
    setLoading(true);
    try {
      const { data } = await api.loginUser(userData);
      localStorage.setItem('token', data.token);
      setUser(data);
      return data; // Return data for component to handle redirects etc.
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // Re-throw for component to handle error messages
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const { data } = await api.registerUser(userData);
      localStorage.setItem('token', data.token);
      setUser(data);
      return data; // Return data for component to handle redirects etc.
    } catch (error) {
      console.error("Registration failed:", error);
      throw error; // Re-throw for component to handle error messages
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = { user, loading, login, register, logout, setUser, setLoading }; // Added setUser, setLoading for more control if needed

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); // Custom hook for easier context access