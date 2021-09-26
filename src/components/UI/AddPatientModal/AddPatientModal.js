import { useState, useRef, useContext } from "react";
import { sendData } from "../../actions/actions";
import { useHistory } from "react-router-dom";
import getTime from "../../../helpers/getTime";
import styles from "./AddPatientModal.module.scss";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AppContext from "../../../store/AppProvider";
import AddPatientForm from "./AddPatientForm/AddPatientForm";
import firebase from "firebase/app";
import uuid from "react-uuid";

const mySwal = withReactContent(Swal);

const AddPatientModal = ({ physiotherapist }) => {
  const [isFormPageChanged, setIsFormPageChanged] = useState(false);
  const changeFormInfoHandler = () => {
    setIsFormPageChanged((prevValue) => !prevValue);
  };

  const appCtx = useContext(AppContext);
  const { setIsLoading, individualCollection, setIndividualPatients } = appCtx;

  const history = useHistory();

  const firstNameInput = useRef();
  const lastNameInput = useRef();
  const genderInput = useRef();
  const cityInput = useRef();
  const addressInput = useRef();
  const phoneNumberInput = useRef();
  const dateOfBirthInput = useRef();
  const observationInput = useRef();
  const dayInputValue = useRef();
  const hourInputValue = useRef();
  const minutesInputValue = useRef();
  const durationInputValue = useRef();

  const resetForm = (inputs) => {
    inputs.map((input) => (input.current.value = ""));
  };

  const addPatientHandler = (e) => {
    e.preventDefault();
    const currentTime = getTime();
    const newPatient = {
      id: uuid(),
      firstName: firstNameInput.current.value,
      lastName: lastNameInput.current.value,
      city: cityInput.current.value,
      address: addressInput.current.value,
      gender: genderInput.current.value,
      phone: phoneNumberInput.current.value,
      dateOfBirth: dateOfBirthInput.current.value,
      observation: observationInput.current.value,
      physiotherapist: physiotherapist.firstName,
      position: {
        topHours: hourInputValue.current.value,
        topMinutes: minutesInputValue.current.value,
        left: dayInputValue.current.value,
        height: durationInputValue.current.value,
      },
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
      newPatient.physiotherapist.trim() === "" ||
      newPatient.position.topHours === "" ||
      newPatient.position.topMinutes === "" ||
      newPatient.position.left === "" ||
      newPatient.position.height === ""
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
    sendData(
      setIsLoading,
      individualCollection,
      newPatient,
      setIndividualPatients
    );
    resetForm([
      firstNameInput,
      lastNameInput,
      genderInput,
      cityInput,
      addressInput,
      phoneNumberInput,
      dateOfBirthInput,
      observationInput,
      dayInputValue,
      hourInputValue,
      minutesInputValue,
      durationInputValue,
    ]);
    history.push(`/patients/individual/${physiotherapist.firstName}/schedule`);
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
        day={dayInputValue}
        hour={hourInputValue}
        minutes={minutesInputValue}
        duration={durationInputValue}
        isFormChanged={isFormPageChanged}
        changeForm={changeFormInfoHandler}
        physiotherapist={physiotherapist}
      />
    </section>
  );
};
export default AddPatientModal;
