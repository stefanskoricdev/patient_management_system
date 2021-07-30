import { useState, useRef, useContext } from "react";
import db from "../../services/firebase";
import styles from "./Scheduler.module.scss";
import AddPatientModal from "../UI/AddPatientModal/AddPatientModal";
import Backdrop from "../UI/Backdrop/Backdrop";
import PatientDetailsModal from "../UI/PatientDetailsModal/PatientDetailsModal";
import Loader from "../UI/Loader/Loader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createScheduleFields } from "../../helpers/createScheduleFields";
import LayoutContext from "../../store/layoutContext";
import AppContext from "../../store/appContext";

const mySwal = withReactContent(Swal);

const Scheduler = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const layoutCtx = useContext(LayoutContext);
  const appCtx = useContext(AppContext);
  const {
    patientId,
    isAddPatientModalOpen,
    isPatientDetailsModalOpen,
    patientModalHandler,
    closePatientDetailsModal,
    closeAddPatientModal,
    setIsAddPatientModalOpen,
  } = layoutCtx;

  const { patients, setPatients } = appCtx;

  const firstNameInput = useRef();
  const lastNameInput = useRef();
  const genderInput = useRef();
  const addressInput = useRef();
  const phoneNumberInput = useRef();
  const dateOfBirthInput = useRef();
  const observationInput = useRef();
  const physiotherapistInput = useRef();

  const { physiotherapist } = props;

  const addPatientHandler = (e) => {
    e.preventDefault();
    const newPatient = {
      id: patientId,
      firstName: firstNameInput.current.value,
      lastName: lastNameInput.current.value,
      address: addressInput.current.value,
      gender: genderInput.current.value,
      phone: phoneNumberInput.current.value,
      dateOfBirth: dateOfBirthInput.current.value,
      observation: observationInput.current.value,
      physiotherapist: physiotherapistInput.current.value,
    };
    if (
      newPatient.id.trim() === "" ||
      newPatient.firstName.trim() === "" ||
      newPatient.lastName.trim() === "" ||
      newPatient.address.trim() === "" ||
      newPatient.gender.trim() === "" ||
      newPatient.phone.trim() === "" ||
      newPatient.dateOfBirth.trim() === "" ||
      newPatient.observation.trim() === "" ||
      newPatient.physiotherapist.trim() === ""
    ) {
      mySwal.fire({
        icon: "warning",
        title: <p>Please fill out all fields</p>,
        customClass: {
          container: "alert-modal",
        },
      });
      return;
    }
    sendData(newPatient);
    setPatients((prevState) => [...prevState, newPatient]);
    setIsAddPatientModalOpen(false);
  };

  const deletePatientHandler = (targetId) => {
    mySwal
      .fire({
        title: "Are you sure you want to delete patient?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(197, 27, 21)",
        cancelButtonColor: "rgb(101, 195, 157)",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          setIsLoading(true);
          db.collection("individual-patients")
            .doc(targetId)
            .delete()
            .then(() => {
              closePatientDetailsModal();
              setPatients((prevState) =>
                prevState.filter((patient) => patient.id !== targetId)
              );
              setIsLoading(false);
              mySwal.fire({
                title: "Deleted!",
                text: "Your file has been deleted",
                icon: "success",
                customClass: { container: "alert-modal" },
              });
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
        }
      });
  };

  const sendData = (newPatient) => {
    setIsLoading(true);
    db.collection("individual-patients")
      .doc(newPatient.id)
      .set(newPatient)
      .then(() => {
        setIsLoading(false);
        mySwal.fire({
          title: "Success!",
          text: "New patient has been created",
          icon: "success",
          customClass: { container: "alert-modal" },
        });
      })
      .catch((error) => {
        mySwal.fire({
          title: "Something went wrong!",
          text: `${error}`,
          icon: "error",
          customClass: { container: "alert-modal" },
        });
      });
  };

  const filteredPatients = patients.filter(
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
          ? { minWidth: "100vw", overflowX: "hidden" }
          : null
      }
      className={styles.Scheduler}
    >
      {isPatientDetailsModalOpen && (
        <Backdrop closeModal={closePatientDetailsModal}>
          <PatientDetailsModal
            deletePatient={deletePatientHandler}
            patients={patients}
            patientId={patientId}
          />
        </Backdrop>
      )}
      {isAddPatientModalOpen && (
        <Backdrop closeModal={closeAddPatientModal}>
          <AddPatientModal
            addPatient={addPatientHandler}
            firstName={firstNameInput}
            lastName={lastNameInput}
            address={addressInput}
            phoneNumber={phoneNumberInput}
            gender={genderInput}
            dateOfBirth={dateOfBirthInput}
            observation={observationInput}
            physiotherapist={physiotherapistInput}
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
          {createScheduleFields(
            filteredPatients,
            patientModalHandler,
            physiotherapist
          )}
        </section>
      </main>
    </section>
  );
};

export default Scheduler;
