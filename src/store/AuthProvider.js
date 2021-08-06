import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  user: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  setDisplayName: (user) => {},
});

export const AuthProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);

  const [displayName, setDisplayName] = useState("");
  //Stores user email so it can be stored and rendered on MainHeader component!

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const userNameHandler = (user) => {
    setDisplayName(user);
  };

  const authCtxValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    setDisplayName: userNameHandler,
    displayName,
  };

  return (
    <AuthContext.Provider value={authCtxValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
