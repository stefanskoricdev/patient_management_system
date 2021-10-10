import { useState, useRef, useContext } from "react";
import { sendData } from "../../actions/actions";
import { useHistory } from "react-router-dom";
import styles from "./AddPatient.module.scss";
import AppContext from "../../../store/AppProvider";
import AddPatientForm from "./AddPatientForm/AddPatientForm";
import firebase from "firebase/app";
import uuid from "react-uuid";
import validateInputs from "../../../helpers/validateInputs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const mySwal = withReactContent(Swal);

const AddPatient = ({ physiotherapist }) => {
  const [isFormPageChanged, setIsFormPageChanged] = useState(false);

  const appCtx = useContext(AppContext);
  const {
    setIsLoading,
    individualCollection,
    setIndividualPatients,
    individualPatients,
    currentDate,
  } = appCtx;

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

  const changeFormInfoHandler = () => {
    setIsFormPageChanged((prevValue) => !prevValue);
  };

  const addPatientHandler = (e) => {
    e.preventDefault();
    const validate = validateInputs([
      firstNameInput,
      lastNameInput,
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

    if (!validate) return;

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
      date: currentDate,
      dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
    };

    const isAppointmentTaken = individualPatients.find(
      (patient) =>
        patient.physiotherapist === newPatient.physiotherapist &&
        patient.position.left === newPatient.position.left &&
        patient.position.topHours === newPatient.position.topHours
    );

    if (isAppointmentTaken) {
      mySwal.fire({
        icon: "warning",
        title: (
          <p>
            Sorry this appointment is taken, please choose another day or time!
          </p>
        ),
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
    history.push(
      `/patients/individual-patients/${physiotherapist.firstName}/schedule`
    );
  };

  return (
    <section id="addPatientModalWrapper" className={styles.AddPatientWrapper}>
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
export default AddPatient;
