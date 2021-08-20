import { useState, useRef, useContext } from "react";
import getTime from "../../../helpers/getTime";
import styles from "./AddPatientModal.module.scss";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { sendData } from "../../actions/actions";
import AppContext from "../../../store/AppProvider";
import AddPatientForm from "./AddPatientForm/AddPatientForm";
import firebase from "firebase/app";
import "firebase/firestore";

const mySwal = withReactContent(Swal);

const AddPatientModal = ({
  setIsModalOpen,
  patientId,
  collection,
  physio,
  setPatients,
}) => {
  const [isFormPageChanged, setIsFormPageChanged] = useState(false);
  const changeFormInfoHandler = () => {
    setIsFormPageChanged((prevValue) => !prevValue);
  };

  const appCtx = useContext(AppContext);
  const { setIsLoading } = appCtx;

  const firstNameInput = useRef();
  const lastNameInput = useRef();
  const genderInput = useRef();
  const cityInput = useRef();
  const addressInput = useRef();
  const phoneNumberInput = useRef();
  const dateOfBirthInput = useRef();
  const observationInput = useRef();

  const addPatientHandler = (e) => {
    e.preventDefault();
    const currentTime = getTime();
    const newPatient = {
      id: patientId,
      firstName: firstNameInput.current.value,
      lastName: lastNameInput.current.value,
      city: cityInput.current.value,
      address: addressInput.current.value,
      gender: genderInput.current.value,
      phone: phoneNumberInput.current.value,
      dateOfBirth: dateOfBirthInput.current.value,
      observation: observationInput.current.value,
      physiotherapist: physio,
      date: currentTime,
      dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
    };
    if (
      newPatient.id.trim() === "" ||
      newPatient.firstName.trim() === "" ||
      newPatient.lastName.trim() === "" ||
      newPatient.city.trim() === "" ||
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
    sendData(setIsLoading, collection, newPatient);
    setPatients((prevState) => [...prevState, newPatient]);
    setIsModalOpen(false);
  };

  return (
    <section id="addPatientModalWrapper" className={styles.AddPatientModal}>
      <AddPatientForm
        submit={addPatientHandler}
        firstName={firstNameInput}
        lastName={lastNameInput}
        gender={genderInput}
        city={cityInput}
        address={addressInput}
        phoneNumber={phoneNumberInput}
        dateOfBirth={dateOfBirthInput}
        observation={observationInput}
        isFormChanged={isFormPageChanged}
        changeForm={changeFormInfoHandler}
        physio={physio}
      />
    </section>
  );
};
export default AddPatientModal;
