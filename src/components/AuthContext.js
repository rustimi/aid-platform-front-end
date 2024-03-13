import React, { createContext, useContext, useState } from 'react';
import { API_BASE_URL } from './config';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [loginError, setLoginError] = useState(null); // State to track login errors
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const login = async (email, password) => {
    setIsAuthenticated(false);
    setLoginError(null)

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        return await checkSessionValid();; // Login successful, check if session is valid and set isAuthenticated
      }
    } catch (error) {
      if (error.response.data.error) {
        setLoginError(error.response.data.error)
      }else{
        setLoginError("Login failed due to server error")
      }
    }
    return false; // Login failed
  };
  

  const logout = async () => {
    localStorage.removeItem('lat');
    localStorage.removeItem('lng');
    localStorage.removeItem('zoom');
    setIsAuthenticated(false);
    setLoginError(null); 
  };

  const checkSessionValid =  async () => {
    try {
      await axios.get(`${API_BASE_URL}/session`);
      setIsAuthenticated(true);
      return true
    } catch {
      setIsAuthenticated(false);
      return false
    }
  }

  const value = {
    login,
    logout,
    loginError,
    setLoginError,
    isAuthenticated,
    checkSessionValid,
    API_BASE_URL
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
