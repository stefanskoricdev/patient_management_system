import { useContext } from "react";
import styles from "./IndividualScheduler.module.scss";
import AddPatientModal from "../UI/AddPatientModal/AddPatientModal";
import Backdrop from "../UI/Backdrop/Backdrop";
import PatientDetailsModal from "../UI/PatientDetailsModal/PatientDetailsModal";
import Loader from "../UI/Loader/Loader";
import { createIndividualScheduleFields } from "../../helpers/createIndividualScheduleFields";
import LayoutContext from "../../store/LayoutProvider";
import AppContext from "../../store/AppProvider";

const COLLECTION = "individual-patients";

const IndividualScheduler = ({ physiotherapist }) => {
  const layoutCtx = useContext(LayoutContext);
  const {
    patientId,
    isAddPatientModalOpen,
    isPatientDetailsModalOpen,
    patientModalHandler,
    closePatientDetailsModal,
    closeAddPatientModal,
    setIsAddPatientModalOpen,
    setIsPatientDetailsModalOpen,
  } = layoutCtx;

  const appCtx = useContext(AppContext);
  const { individualPatients, setIndividualPatients, isLoading, setIsLoading } =
    appCtx;

  const filteredPatients = individualPatients.filter(
    (patient) => patient.physiotherapist === physiotherapist
  );
  // getData() in App Provider fetches data from firebase and adds it to patients state
  // which is sent in this component through appContext and then filtered according
  //to which physio this component belongs to (we get that trough props).
  //This way we avoid data being fetched every time we click physio tab!

  return (
    <section
      style={
        isAddPatientModalOpen || isPatientDetailsModalOpen
          ? {
              minWidth: "100vw",
              overflowX: "hidden",
              maxHeight: "100vh",
            }
          : null
      }
      className={styles.Scheduler}
    >
      {isPatientDetailsModalOpen && (
        <Backdrop closeModal={closePatientDetailsModal}>
          <PatientDetailsModal
            setIsModalOpen={setIsPatientDetailsModalOpen}
            setLoading={setIsLoading}
            setPatients={setIndividualPatients}
            patients={individualPatients}
            patientId={patientId}
            collection={COLLECTION}
          />
        </Backdrop>
      )}
      {isAddPatientModalOpen && (
        <Backdrop closeModal={closeAddPatientModal}>
          <AddPatientModal
            setPatients={setIndividualPatients}
            setIsModalOpen={setIsAddPatientModalOpen}
            patientId={patientId}
            collection={COLLECTION}
            physio={physiotherapist}
          />
        </Backdrop>
      )}
      {isLoading && <Loader />}

      <header className={styles.Header}>
        <li>MON</li>
        <li>TUE</li>
        <li>WED</li>
        <li>THU</li>
        <li>FRI</li>
      </header>
      <main className={styles.Main}>
        <div className={styles.Time}>
          <ul>
            <li>08:00</li>
            <li>09:00</li>
            <li>10:00</li>
            <li>11:00</li>
            <li>12:00</li>
            <li>13:00</li>
            <li>14:00</li>
            <li>15:00</li>
            <li>16:00</li>
            <li>17:00</li>
            <li>18:00</li>
            <li>19:00</li>
            <li>20:00</li>
            <li>21:00</li>
          </ul>
        </div>
        <section id="schedule" className={styles.Schedule}>
          {createIndividualScheduleFields(
            filteredPatients,
            patientModalHandler,
            physiotherapist
          )}
        </section>
      </main>
    </section>
  );
};

export default IndividualScheduler;
