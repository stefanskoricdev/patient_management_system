import { React, useState, useEffect } from "react";
import AppContext from "./appContext";
import db from "../services/firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const mySwal = withReactContent(Swal);

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

  const getData = () => {
    let patientsList = [];
    setIsLoading(true);
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
          setIsLoading(false);
        });
        setPatients(patientsList);
      })
      .catch((error) => {
        setIsLoading(false);
        mySwal.fire({
          title: "Something went wrong!!",
          text: `${error}`,
          icon: "error",
          customClass: { container: "alert-modal" },
        });
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
