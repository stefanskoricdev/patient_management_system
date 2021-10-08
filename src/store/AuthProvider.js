import React, { useState, useEffect } from "react";
import { getData } from "../components/actions/actions";

const AuthContext = React.createContext({
  token: "",
  user: "",
  isLoggedIn: false,
  isAdmin: false,
  login: () => {},
  logout: () => {},
  setDisplayName: () => {},
});

const USERS_COLLECTION = "users";

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);

  const initialDisplayName = localStorage.getItem("displayName");
  const [displayName, setDisplayName] = useState(initialDisplayName);

  const initialIsAdminValue = localStorage.getItem("isAdmin");
  const [isAdmin, setIsAdmin] = useState(initialIsAdminValue);

  const [isLoading, setIsLoading] = useState(false);

  const userIsLoggedIn = !!token;

  const loginHandler = (token, targetedUser) => {
    const admin = targetedUser.isAdmin;
    const displayName = targetedUser.firstName;
    if (admin) {
      setIsAdmin(admin);
      localStorage.setItem("isAdmin", admin);
    }
    setToken(token);
    localStorage.setItem("token", token);
    setDisplayName(displayName);
    localStorage.setItem("displayName", displayName);
  };

  const logoutHandler = () => {
    if (isAdmin) {
      setIsAdmin(false);
      localStorage.removeItem("isAdmin");
    }
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("displayName");
  };

  useEffect(() => {
    getData(setIsLoading, setUsers, USERS_COLLECTION);
  }, []);

  const authCtxValue = {
    usersCollection: USERS_COLLECTION,
    setUsers,
    users,
    token,
    displayName,
    setIsLoading,
    isLoading,
    isAdmin,
    login: loginHandler,
    logout: logoutHandler,
    isLoggedIn: userIsLoggedIn,
  };

  return (
    <AuthContext.Provider value={authCtxValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
