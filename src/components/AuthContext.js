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
        // localStorage.setItem('token', response.headers.authorization);
        return isAuthenticated(); 
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
    // localStorage.removeItem('token');
    localStorage.removeItem('lat');
    localStorage.removeItem('lng');
    localStorage.removeItem('zoom');
    axios.defaults.headers.common['Authorization'] = null
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

export function isAuthenticated() {
  // const token = localStorage.getItem('token');
  // if (token !== null){
  //   axios.defaults.headers.common['Authorization'] = token;
  //   return true;
  // }
  // return false;
  return true;
}