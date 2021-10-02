import React, { useState, useEffect, useContext } from "react";
import { getData } from "../components/actions/actions";
import AuthContext from "./AuthProvider";

const AppContext = React.createContext();

const INDIVIDUAL_COLLECTION = "individual-patients";
const GROUPS_COLLECTION = "group-patients";
const NOTES_COLLECTION = "notes";
const PHYSIOS_COLLECTION = "physios";

export const AppProvider = ({ children }) => {
  const [individualPatients, setIndividualPatients] = useState([]);
  const [groupPatients, setGroupPatients] = useState([]);
  const [notes, setNotes] = useState([]);
  const [physios, setPhysios] = useState([]);

  const authCtx = useContext(AuthContext);
  const { isLoggedIn, isLoading, setIsLoading } = authCtx;

  useEffect(() => {
    if (isLoggedIn) {
      getData(setIsLoading, setIndividualPatients, INDIVIDUAL_COLLECTION);
      getData(setIsLoading, setGroupPatients, GROUPS_COLLECTION);
      getData(setIsLoading, setNotes, NOTES_COLLECTION);
      getData(setIsLoading, setPhysios, PHYSIOS_COLLECTION);
    }
    //Getting data here and send trough app via context
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const appContextValue = {
    individualPatients,
    setIndividualPatients,
    groupPatients,
    setGroupPatients,
    notes,
    setNotes,
    physios,
    setPhysios,
    individualCollection: INDIVIDUAL_COLLECTION,
    groupsCollection: GROUPS_COLLECTION,
    notesCollection: NOTES_COLLECTION,
    physiosCollection: PHYSIOS_COLLECTION,
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
