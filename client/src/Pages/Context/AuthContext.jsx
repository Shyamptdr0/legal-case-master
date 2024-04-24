import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  
  const [userdata, setUser, setUserdata] = useState({ });

  const updateProfile = (newProfileData) => {
    // Update user's profile data (e.g., make API call to update user data)
    setUserdata({ ...userdata, ...newProfileData });
  };

  // Other authentication functions (login, logout, etc.)

  const value = {
    userdata,
    updateProfile,
    // Other authentication values/functions to be provided
  };

  
  const fetchUser = async () => {
    try {
      const response = await axios.get('/api/profile/userdata', {
        withCredentials: true,
      });
      setUser(response.data.user);
    } catch (error) {
      setUser(null);
      console.error('Error fetching user data:', error);
    }
  };

  const logout = async () => {
    try {
      await axios.get('/api/auth/logout', {
        withCredentials: true,
      });
      setUser(null);

    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);



  
  return (
    <AuthContext.Provider value={{ userdata, logout, value }}>
      {children}
    </AuthContext.Provider>
  );
};
