import { useParams } from "react-router-dom";
import { useContext, Fragment } from "react";
import AppContext from "../../../store/AppProvider";

const PatientDetailsModal = () => {
  const { id } = useParams();
  const appCtx = useContext(AppContext);
  const { individualPatients } = appCtx;

  const targetedPatient = individualPatients
    .filter((patient) => patient.id === id)
    .map((pat, i) => {
      return (
        <Fragment key={i}>
          <h1>{pat.firstName}</h1>
          <h1>{pat.lastName}</h1>
          <h2>{pat.dateOfBirth}</h2>
          <h2>{pat.gender}</h2>
        </Fragment>
      );
    });
  return <section>{targetedPatient}</section>;
};

export default PatientDetailsModal;
