import React, { useState } from "react";
import { createDisplayName } from "../helpers/createDisplayName";

const AuthContext = React.createContext({
  token: "",
  user: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  setDisplayName: (user) => {},
});

export const AuthProvider = ({ children }) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);

  const initialDisplayName = localStorage.getItem("displayName");
  const [displayName, setDisplayName] = useState(initialDisplayName);
  //Stores user email so it can be stored and rendered on MainHeader component!

  const userIsLoggedIn = !!token;

  const loginHandler = (token, email) => {
    setToken(token);
    localStorage.setItem("token", token);
    setDisplayName(createDisplayName(email));
    localStorage.setItem("displayName", createDisplayName(email));
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("displayName");
  };

  const authCtxValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    displayName,
  };

  return (
    <AuthContext.Provider value={authCtxValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
