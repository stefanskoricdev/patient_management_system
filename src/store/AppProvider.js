import { React, useState, useEffect } from "react";
import AppContext from "./appContext";
import db from "../services/firebase";

const AppProvider = (props) => {
  const [isNavBtnClicked, setIsNavBtnClicked] = useState(false);
  const [patients, setPatients] = useState([]);

  const openNavHandler = () => {
    setIsNavBtnClicked(true);
  };

  const closeNavHandler = (e) => {
    if (e.target.getAttribute("data-id") !== "nav-btn") {
      setIsNavBtnClicked(false);
    }
  };

  const getData = () => {
    let patientsList = [];
    db.collection("individual-patients")
      .get()
      .then((patients) => {
        patients.forEach((patient) => {
          const singlePatient = {
            id: patient.data().id,
            firstName: patient.data().firstName,
            lastName: patient.data().lastName,
            address: patient.data().address,
            gender: patient.data().gender,
            phone: patient.data().phone,
            dateOfBirth: patient.data().dateOfBirth,
            observation: patient.data().observation,
            physiotherapist: patient.data().physiotherapist,
          };
          patientsList.push(singlePatient);
        });
        setPatients(patientsList);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //Getting data here and then i can use it trough app without fetching again
  //until user refreshes the page!

  useEffect(() => {
    getData();
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
  };
  return (
    <AppContext.Provider value={appContextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
