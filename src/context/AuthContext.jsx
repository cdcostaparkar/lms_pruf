import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Auth Context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => localStorage.getItem("userId"));
  const [roleName, setRoleName] = useState(() => localStorage.getItem("roleName"));

  const login = (userId, role) => {
    localStorage.setItem("userId", userId);
    localStorage.setItem("roleName", role);
    setUser(userId);
    setRoleName(role);
  };

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("roleName");
    setUser(null);
    setRoleName(null);
  };

  // Optional: Sync state with local storage on mount
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedRoleName = localStorage.getItem("roleName");
    if (storedUserId) {
      setUser(storedUserId);
    }
    if (storedRoleName) {
      setRoleName(storedRoleName);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, roleName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth Context
export const useAuth = () => useContext(AuthContext);
