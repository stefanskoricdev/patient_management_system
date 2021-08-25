import React, { useState, useEffect, useContext } from "react";
import { getData, getNotes } from "../components/actions/actions";
import AuthContext from "./AuthProvider";

const AppContext = React.createContext();

const INDIVIDUAL_COLLECTION = "individual-patients";
const GROUPS_COLLECTION = "group-patients";
const NOTES_COLLECTION = "notes";

export const AppProvider = ({ children }) => {
  const [individualPatients, setIndividualPatients] = useState([]);
  const [groupPatients, setGroupPatients] = useState([]);
  const [notes, setNotes] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);
  const { isLoggedIn } = authCtx;

  useEffect(() => {
    if (isLoggedIn) {
      getData(setIsLoading, setIndividualPatients, INDIVIDUAL_COLLECTION);
      getData(setIsLoading, setGroupPatients, GROUPS_COLLECTION);
      getNotes(setIsLoading, setNotes, NOTES_COLLECTION);
    }
    //Getting data here and send trough app via context
  }, [isLoggedIn]);

  const appContextValue = {
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
