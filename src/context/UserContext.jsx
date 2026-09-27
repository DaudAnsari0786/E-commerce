import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

const STORAGE_KEY = 'stylecraft:user';

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      /* ignore */
    }
    return null;
  });

  useEffect(() => {
    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, [user]);

  const login = (userData) => {
    // userData includes password now
    setUser({
      ...userData,
      memberSince: userData.memberSince || new Date().getFullYear().toString(),
    });
  };

  const signup = (userData) => {
    // userData includes password now
    setUser({
      ...userData,
      memberSince: userData.memberSince || new Date().getFullYear().toString(),
    });
  };

  const logout = () => setUser(null);

  const updateUser = (updates) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  return (
    <UserContext.Provider value={{ user, login, signup, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};

export default UserContext;