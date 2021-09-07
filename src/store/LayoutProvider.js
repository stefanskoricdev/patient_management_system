import React, { useState } from "react";

const LayoutContext = React.createContext();

export const LayoutProvider = ({ children }) => {
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
    console.log(e.currentTarget.id === "close-modal");
    if (e.target.id === "backdrop" || e.currentTarget.id === "close-modal") {
      setIsPatientDetailsModalOpen(false);
    }
  };
  const closeAddPatientModal = (e) => {
    console.log(e.currentTarget.id === "close-modal");
    if (e.target.id === "backdrop" || e.currentTarget.id === "close-modal") {
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
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutContext;
