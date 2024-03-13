import React, { createContext, useContext, useState } from 'react';
import { API_BASE_URL } from './config';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [loginError, setLoginError] = useState(null); // State to track login errors
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  
  const login = async (email, password) => {
    setIsAuthenticated(false);
    setLoginError(null)

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: email,
        password: password,
      });
  
      if (response.status === 200) {
        localStorage.setItem('isAuthenticated', 'true');
        setIsAuthenticated(true);
        return true; // Login successful
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
    // localStorage.removeItem('token');
    localStorage.removeItem('lat');
    localStorage.removeItem('lng');
    localStorage.removeItem('zoom');
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    setLoginError(null); 
  };


  const value = {
    login,
    logout,
    loginError,
    setLoginError,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
