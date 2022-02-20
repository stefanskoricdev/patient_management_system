import React, { useState, useEffect, useContext } from "react";
import { getData } from "../components/actions/actions";
import getDate from "../helpers/getDate";
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
  const [currentDate, setCurrentDate] = useState();

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
  }, [isLoggedIn, setIsLoading]);

  useEffect(() => {
    setCurrentDate(getDate());
  }, []);

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
    currentDate,
  };
  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
