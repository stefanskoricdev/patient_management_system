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

  const { days, time } = config;
  const daysValue = config.days.map((day, i) => <li key={i}>{day}</li>);
  const timeValue = config.time.map((time, i) => <li key={i}>{time}</li>);

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

      <header className={styles.Header}>{daysValue}</header>
      <main className={styles.Main}>
        <div className={styles.Time}>
          <ul>{timeValue}</ul>
        </div>
        <section
          id="schedule"
          className={styles.Schedule}
          style={{
            gridTemplateColumns: `repeat(${daysValue.length}, ${
              100 / daysValue.length
            }% [col-start])`,
            gridTemplateRows: `repeat(${timeValue.length}, 20rem [row-start])`,
          }}
        >
          {createGroupsScheduleFields(
            groupPatients,
            physiotherapist,
            days,
            time,
            patientModalHandler,
            patientId
          )}
        </section>
      </main>
    </section>
  );
};
export default GroupsScheduler;
