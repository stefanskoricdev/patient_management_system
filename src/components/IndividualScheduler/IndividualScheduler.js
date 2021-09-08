import styles from "./IndividualScheduler.module.scss";
import { useContext } from "react";
import { createIndividualScheduleFields } from "../../helpers/createIndividualScheduleFields";
import AddPatientModal from "../UI/AddPatientModal/AddPatientModal";
import Backdrop from "../UI/Backdrop/Backdrop";
import PatientDetailsModal from "../UI/PatientDetailsModal/PatientDetailsModal";
import Loader from "../UI/Loader/Loader";
import LayoutContext from "../../store/LayoutProvider";
import AppContext from "../../store/AppProvider";

const COLLECTION = "individual-patients";

const IndividualScheduler = ({ config, physiotherapist }) => {
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
  const workingDays = config[0].workingDays.map((days, i) => (
    <li key={i}>{days}</li>
  ));
  const workingHours = config[0].workingHours.map((hours, i) => (
    <li key={i}>{hours}</li>
  ));
  console.log(workingDays.length);

  return (
    <section
      className={
        isAddPatientModalOpen || isPatientDetailsModalOpen
          ? [styles.Scheduler, styles["ModalOpen"]].join(" ")
          : styles.Scheduler
      }
    >
      {isPatientDetailsModalOpen && (
        <Backdrop closeModal={closePatientDetailsModal}>
          <PatientDetailsModal
            closeModal={closePatientDetailsModal}
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
            closeModal={closeAddPatientModal}
            setPatients={setIndividualPatients}
            setIsModalOpen={setIsAddPatientModalOpen}
            patientId={patientId}
            collection={COLLECTION}
            physio={physiotherapist}
          />
        </Backdrop>
      )}
      {isLoading && <Loader />}

      <header className={styles.Header}>{workingDays}</header>
      <main className={styles.Main}>
        <div className={styles.Time}>
          <ul>{workingHours}</ul>
        </div>
        <section
          id="schedule"
          className={styles.Schedule}
          style={{
            gridTemplateColumns: `repeat(${workingDays.length}, 20% [col-start])`,
            gridTemplateRows: `repeat(${workingHours.length}, 10rem [row-start])`,
          }}
        >
          {createIndividualScheduleFields(
            filteredPatients,
            patientModalHandler,
            physiotherapist,
            workingDays,
            workingHours
          )}
        </section>
      </main>
    </section>
  );
};

export default IndividualScheduler;
