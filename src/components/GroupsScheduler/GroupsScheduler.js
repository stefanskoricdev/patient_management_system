import styles from "./GroupsScheduler.module.scss";
import { useContext } from "react";
import { createGroupsScheduleFields } from "../../helpers/createGroupsScheduleFields";
import AddPatientModal from "../UI/AddPatientModal/AddPatientModal";
import PatientDetailsModal from "../UI/PatientDetailsModal/PatientDetailsModal";
import Backdrop from "../UI/Backdrop/Backdrop";
import Loader from "../UI/Loader/Loader";
import AppContext from "../../store/AppProvider";
import LayoutContext from "../../store/LayoutProvider";

const COLLECTION = "group-patients";

const GroupsScheduler = ({ physiotherapist, config }) => {
  const appCtx = useContext(AppContext);
  const { groupPatients, setGroupPatients, isLoading, setIsLoading } = appCtx;

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
  /* const workingDays = config[0].workingDays;
  const workingHours = config[0].workingHours; */

  const workingDays = config[0].workingDays.map((day, i) => (
    <li key={i}>{day}</li>
  ));
  const workingHours = config[0].workingHours.map((hour, i) => (
    <li key={i}>{hour}</li>
  ));

  return (
    <section
      className={
        isAddPatientModalOpen || isPatientDetailsModalOpen
          ? [styles.SchedulerWrapper, styles["ModalOpen"]].join(" ")
          : styles.SchedulerWrapper
      }
    >
      {isPatientDetailsModalOpen && (
        <Backdrop closeModal={closePatientDetailsModal}>
          <PatientDetailsModal
            closeModal={closePatientDetailsModal}
            setIsModalOpen={setIsPatientDetailsModalOpen}
            setLoading={setIsLoading}
            setPatients={setGroupPatients}
            patients={groupPatients}
            patientId={patientId}
            collection={COLLECTION}
          />
        </Backdrop>
      )}
      {isAddPatientModalOpen && (
        <Backdrop closeModal={closeAddPatientModal}>
          <AddPatientModal
            closeModal={closeAddPatientModal}
            setPatients={setGroupPatients}
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
            gridTemplateRows: `repeat(${workingHours.length}, 20rem [row-start])`,
          }}
        >
          {createGroupsScheduleFields(
            groupPatients,
            physiotherapist,
            workingDays,
            workingHours,
            patientModalHandler,
            patientId
          )}
        </section>
      </main>
    </section>
  );
};
export default GroupsScheduler;
