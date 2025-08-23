import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import axios from 'axios';
import { apiUrl } from '../../config';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Retrieve user data from localStorage on initial load
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData) => {
    setUser(userData.data);
    localStorage.setItem('user', JSON.stringify(userData.data)); // Save user data to localStorage
    console.log('Auth Successful');
    console.log(userData.data);
  };

  const logout = async () => {
    if (user) {
      try {
        const userJson = JSON.parse(JSON.stringify(user));
        const userName = {
          username: userJson.username,
        };
        console.log(JSON.stringify(userName));

        await axios.post(
          `${apiUrl}/logout`,
          JSON.stringify(userName),
          { withCredentials: true }
        );
        console.log('Logout Successful');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
    setUser(null);
    localStorage.removeItem('user'); // Clear user data from localStorage
  };

  useEffect(() => {
    // Optional: You can add token validation or refresh logic here
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;