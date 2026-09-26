import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // in-memory only (demo)

  const login = () => {
    const demoUser = {
      id: 1,
      name: 'Jane Doe',
      username: 'janedoe',
      email: 'jane@example.com',
      phone: '+91 90263 50956',
      address: 'Vill. Rukmalpur Post Meerpur, Atrauliya-Azamgarh, UP 223223',
      memberSince: '2026',
    };
    setUser(demoUser);
    console.log('✅ Login — user data:', demoUser);
    return demoUser;
  };

  const signup = () => {
    const demoUser = {
      id: 2,
      name: 'New Customer',
      username: 'newcustomer',
      email: 'new@example.com',
      phone: '+91 98765 43210',
      address: '',
      memberSince: '2026',
    };
    setUser(demoUser);
    console.log('✅ Signup — user data:', demoUser);
    return demoUser;
  };

  const logout = () => {
    console.log('👋 Logout — clearing user:', user);
    setUser(null);
  };

  const updateUser = (patch) => {
    setUser((prev) => {
      const next = { ...prev, ...patch };
      console.log('💾 User updated:', next);
      return next;
    });
  };

  return (
    <UserContext.Provider value={{ user, login, signup, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used inside <UserProvider>');
  return ctx;
};