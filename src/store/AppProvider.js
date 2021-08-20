import React, { useState, useEffect, useContext } from "react";
import { getData, getNotes } from "../components/actions/actions";
import AuthContext from "./AuthProvider";

const AppContext = React.createContext();

const INDIVIDUAL_COLLECTION = "individual-patients";
const GROUPS_COLLECTION = "group-patients";
const NOTES_COLLECTION = "notes";

export const AppProvider = ({ children }) => {
  const [isNavBtnClicked, setIsNavBtnClicked] = useState(false);
  const [individualPatients, setIndividualPatients] = useState([]);
  const [groupPatients, setGroupPatients] = useState([]);
  const [notes, setNotes] = useState([]);

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
      getData(setIsLoading, setIndividualPatients, INDIVIDUAL_COLLECTION);
      getData(setIsLoading, setGroupPatients, GROUPS_COLLECTION);
      getNotes(setIsLoading, setNotes, NOTES_COLLECTION);
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
    individualPatients,
    setIndividualPatients,
    groupPatients,
    setGroupPatients,
    notes,
    setNotes,
    isLoading,
    setIsLoading,
  };
  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
