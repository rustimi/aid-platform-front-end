import React, { createContext, useContext } from 'react';
import { API_BASE_URL } from './config';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {

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
        return true;
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
    return false; // Login failed
  };
  

  const logout = () => {
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = null
  };

  const value = {
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
