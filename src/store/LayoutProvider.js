import { React, useState } from "react";
import LayoutContext from "./layoutContext";

const LayoutProvider = (props) => {
  const [patientId, setPatientId] = useState();
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [isPatientDetailsModalOpen, setIsPatientDetailsModalOpen] =
    useState(false);

  const patientModalHandler = (e) => {
    if (e.target.innerHTML === "") {
      setIsAddPatientModalOpen((prevState) => !prevState);
      setPatientId(e.target.getAttribute("data-id"));
      // Takes data-id attr value from 'li' element and gives it to a new patient as its ID. So when page loads
      //each patient will be rendered to 'li' element with same ID.
      return;
    }
    setIsPatientDetailsModalOpen((prevState) => !prevState);
    setPatientId(e.target.getAttribute("data-id"));
  };

  const closePatientDetailsModal = (e) => {
    if (e.target.id === "backdrop") {
      setIsPatientDetailsModalOpen(false);
    }
  };
  const closeAddPatientModal = (e) => {
    if (e.target.id === "backdrop") {
      setIsAddPatientModalOpen(false);
    }
  };

  const layoutContextValue = {
    patientId,
    isAddPatientModalOpen,
    isPatientDetailsModalOpen,
    patientModalHandler,
    closePatientDetailsModal,
    closeAddPatientModal,
    setIsAddPatientModalOpen,
    setIsPatientDetailsModalOpen,
  };
  return (
    <LayoutContext.Provider value={layoutContextValue}>
      {props.children}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
