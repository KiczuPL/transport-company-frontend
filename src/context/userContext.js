import React from "react";

export const UserContext = React.createContext({
  token: "",
  setToken: () => {},
  authenticated: false,
  setAuthenticated: (auth) => {},
  user: {},
  setUser: (user) => {},
  isAdmin: false,
  setIsAdmin: (isAdmin) => {},
});
