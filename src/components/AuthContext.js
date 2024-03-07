import React, { createContext, useContext, useState } from 'react';
import { API_BASE_URL } from './config';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [loginError, setLoginError] = useState(null); // State to track login errors
  
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: email,
        password: password,
      });
  
      if (response.status === 200) {
        localStorage.setItem('token', response.headers.authorization);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.headers.authorization}`;
        return true; // Login successful
      }
    } catch (error) {
      let errorMessage = ''    
      if (error.response.data.error) {
        errorMessage =  error.response.data.error
      }else{
        errorMessage = "Login failed due to server error"
      }
      setLoginError(errorMessage);
    }
    return false; // Login failed
  };
  

  const logout = () => {
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = null
    setLoginError(null); 
  };

  const value = {
    login,
    logout,
    loginError,
    setLoginError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
