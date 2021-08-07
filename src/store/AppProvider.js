import { React, useState, useEffect, useContext } from "react";
import AppContext from "./appContext";
import AuthContext from "./AuthProvider";
import { getData } from "../components/actions/actions";

const AppProvider = (props) => {
  const [isNavBtnClicked, setIsNavBtnClicked] = useState(false);
  const [patients, setPatients] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);
  const { isLoggedIn } = authCtx;

  const openNavHandler = () => {
    setIsNavBtnClicked(true);
  };

  const closeNavHandler = (e) => {
    if (e.target.getAttribute("data-id") !== "nav-btn") {
      setIsNavBtnClicked(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      //Dont get data until is logged in because if there is no patients in database
      //It will shoot alert modal in Login page.
      getData(setIsLoading, setPatients);
    }
    //Getting data here and send trough app via context
  }, [isLoggedIn]);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target.getAttribute("data-id") !== "nav-btn") {
        setIsNavBtnClicked(false);
      }
    });
  }, []);

  const appContextValue = {
    isNavBtnClicked,
    openNavHandler,
    closeNavHandler,
    patients,
    setPatients,
    isLoading,
    setIsLoading,
  };
  return (
    <AppContext.Provider value={appContextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
