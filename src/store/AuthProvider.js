import React, { useState, useEffect } from "react";
import { getData } from "../components/actions/actions";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const mySwal = withReactContent(Swal);

const AuthContext = React.createContext();

const USERS_COLLECTION = "users";

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);

  const initialDisplayName = localStorage.getItem("displayName");
  const [displayName, setDisplayName] = useState(initialDisplayName);

  const initialIsAdminValue = localStorage.getItem("isAdmin");
  const [isAdmin, setIsAdmin] = useState(initialIsAdminValue);

  const initialUserId = localStorage.getItem("userID");
  const [userId, setUserId] = useState(initialUserId);

  const initialProfileImgUrl = localStorage.getItem("profileImg");
  const [profileImgUrl, setProfileImgUrl] = useState(initialProfileImgUrl);

  const [isLoading, setIsLoading] = useState(false);

  const userIsLoggedIn = !!token;

  const loginHandler = (token, targetedUser) => {
    const { isAdmin, firstName, id, profileImgUrl } = targetedUser;
    if (isAdmin) {
      setIsAdmin(isAdmin);
      localStorage.setItem("isAdmin", isAdmin);
    }
    setToken(token);
    localStorage.setItem("token", token);
    setDisplayName(firstName);
    localStorage.setItem("displayName", firstName);
    setUserId(id);
    localStorage.setItem("userID", id);
    setProfileImgUrl(profileImgUrl);
    localStorage.setItem("profileImg", profileImgUrl);
  };

  const logoutHandler = () => {
    mySwal
      .fire({
        title: "Are you sure you wish to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(197, 27, 21)",
        cancelButtonColor: "rgb(101, 195, 157)",
        confirmButtonText: "Yes!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          if (isAdmin) {
            setIsAdmin(false);
            localStorage.removeItem("isAdmin");
          }
          setToken(null);
          localStorage.removeItem("token");
          localStorage.removeItem("displayName");
          localStorage.removeItem("userID");
          localStorage.removeItem("profileImg");
          return;
        }
        return;
      });
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
    setDisplayName,
    userId,
    profileImgUrl,
    setProfileImgUrl,
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
