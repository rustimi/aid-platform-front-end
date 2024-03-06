import React, { createContext, useContext, useState } from 'react';
import { API_BASE_URL } from './config';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);


  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: email,
        password: password,
      });
  
      if (response.status === 200) {
        // The request was successful
        localStorage.setItem('token', response.headers.authorization);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.headers.authorization}`;
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      if (error.response) {
        console.error('Login error:', error.response.data);
      } else if (error.request) {
        // Request was made but no response
        console.error('Login error: No response received');
      } else {
        // Something happened sho error
        console.error('Login error:', error.message);
      }
    }
  };
  

  const logout = () => {
    // Implement logout logic
    setCurrentUser(null);
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = null
  };

  const value = {
    currentUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
