import React, { useState, createContext } from 'react';


const defaultContextValues = {
  authContext: {
    user: {},
    isLoggedIn: true, //TODO
    isLoading: false
  },
  login: () => {},
  logout: () => {},
}

// Context
export const AuthContext = createContext(defaultContextValues);

// Provider
export const AuthProvider = ({ children }) => {
  const [authContext, setAuthContext] = useState(defaultContextValues.authContext);

  const login = (user) => {
    setAuthContext(_ => ({
      user,
      isLoggedIn: true,
      isLoading: false,
    }));
  };

  const logout = () => {
    setAuthContext(_ => ({
      user: {},
      isLoggedIn: false,
      isLoading: false,
    }));
  };

  // TODO, on load, check if user is logged already or that...

  return (
    <AuthContext.Provider value={{ authContext, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
