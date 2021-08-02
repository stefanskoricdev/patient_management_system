import { React, useState, useEffect } from "react";
import AppContext from "./appContext";
import { getData } from "../components/actions/actions";

const AppProvider = (props) => {
  const [isNavBtnClicked, setIsNavBtnClicked] = useState(false);
  const [patients, setPatients] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const openNavHandler = () => {
    setIsNavBtnClicked(true);
  };

  const closeNavHandler = (e) => {
    if (e.target.getAttribute("data-id") !== "nav-btn") {
      setIsNavBtnClicked(false);
    }
  };

  useEffect(() => {
    getData(setIsLoading, setPatients);
    //Getting data here and then i can use it trough app without fetching again
    //until user refreshes the page!
  }, []);

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
