import styles from "./AddEditPatientForm.module.scss";
import { useContext, useState } from "react";
import { sendData, updateData } from "../../../actions/actions";
import { useHistory, useRouteMatch } from "react-router-dom";
import AppContext from "../../../../store/AppProvider";
import firebase from "firebase/app";
import uuid from "react-uuid";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import validateForm from "../../../../helpers/validateForm";

const mySwal = withReactContent(Swal);

const AddEditPatientForm = ({ physiotherapist }) => {
  const history = useHistory();
  const {
    params: { id },
  } = useRouteMatch();

  const isAddMode = !id;

  const appCtx = useContext(AppContext);
  const {
    setIsLoading,
    individualCollection,
    setIndividualPatients,
    individualPatients,
    currentDate,
  } = appCtx;

  let initialValues;

  if (!isAddMode) {
    const patientToEdit = individualPatients.find(
      (patient) => patient.id === id
    );
    initialValues = {
      firstName: patientToEdit.firstName,
      lastName: patientToEdit.lastName,
      gender: patientToEdit.gender,
      city: patientToEdit.city,
      address: patientToEdit.address,
      phoneNumber: patientToEdit.phone,
      email: patientToEdit.email,
      dob: patientToEdit.dateOfBirth,
      observation: patientToEdit.observation,
      days: patientToEdit.position.left,
      hours: patientToEdit.position.topHours,
      minutes: patientToEdit.position.topMinutes,
      duration: patientToEdit.position.height,
    };
  } else {
    initialValues = {
      firstName: "",
      lastName: "",
      gender: "male",
      city: "",
      address: "",
      phoneNumber: "",
      email: "",
      dob: "",
      observation: "",
      days: "0",
      hours: "0",
      minutes: "0",
      duration: "0",
    };
  }

  const [isFormPageChanged, setIsFormPageChanged] = useState(false);

  const [inputValue, setInputValue] = useState(initialValues);

  const { workingDays, workingHours } = physiotherapist;

  const changeFormPageHandler = () => {
    setIsFormPageChanged((prevValue) => !prevValue);
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const submitPatientHandler = (e) => {
    e.preventDefault();

    const validate = validateForm(inputValue);

    if (!validate) return;

    const newPatient = {
      id: isAddMode ? uuid() : id,
      firstName: inputValue.firstName,
      lastName: inputValue.lastName,
      city: inputValue.city,
      address: inputValue.address,
      gender: inputValue.gender,
      phone: inputValue.phoneNumber,
      email: inputValue.email,
      dateOfBirth: inputValue.dob,
      observation: inputValue.observation,
      physiotherapist: physiotherapist.firstName,
      position: {
        topHours: inputValue.hours,
        topMinutes: inputValue.minutes,
        left: inputValue.days,
        height: inputValue.duration,
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

    if (isAddMode) {
      if (
        isAppointmentTaken &&
        +newPatient.position.topMinutes <
          +isAppointmentTaken.position.topMinutes +
            +isAppointmentTaken.position.height
      ) {
        mySwal.fire({
          icon: "warning",
          title: (
            <p>
              Sorry this appointment is taken, please choose another day or
              time!
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
    } else {
      const targetedPatientIndex = individualPatients.findIndex(
        (patient) => patient.id === newPatient.id
      );
      const updatedPatientsList = [...individualPatients];
      updatedPatientsList[targetedPatientIndex] = newPatient;
      updateData(setIsLoading, individualCollection, id, newPatient);
      setIndividualPatients(updatedPatientsList);
    }
    history.push(
      `/patients/individual-patients/${physiotherapist.firstName}/schedule`
    );
  };

  return (
    <form
      noValidate
      className={styles.AddEditPatientForm}
      onSubmit={(e) => {
        submitPatientHandler(e);
      }}
    >
      <header>
        <h2>{isAddMode ? "Create New Patient" : "Edit Patient"}</h2>
      </header>
      <main
        className={
          isFormPageChanged
            ? [styles.Main, styles["active"]].join(" ")
            : styles.Main
        }
      >
        <section className={styles.BasicInfo}>
          <label>
            First Name:
            <input
              name="firstName"
              type="text"
              value={inputValue.firstName}
              onChange={onChangeHandler}
            />
          </label>
          <label>
            Last Name:
            <input
              name="lastName"
              type="text"
              value={inputValue.lastName}
              onChange={onChangeHandler}
            />
          </label>
          <section className={styles.GenderWrapper}>
            <label>Select gender: </label>
            <select
              name="gender"
              value={inputValue.gender}
              onChange={onChangeHandler}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </section>
          <label>
            City:
            <input
              name="city"
              type="text"
              value={inputValue.city}
              onChange={onChangeHandler}
            />
          </label>
          <label>
            Address:
            <input
              name="address"
              type="text"
              value={inputValue.address}
              onChange={onChangeHandler}
            />
          </label>
          <label>
            Phone Number:
            <input
              name="phoneNumber"
              type="tel"
              value={inputValue.phoneNumber}
              onChange={onChangeHandler}
            />
          </label>
          <label>
            Email:
            <input
              name="email"
              type="email"
              value={inputValue.email}
              onChange={onChangeHandler}
            />
          </label>
          <label>
            Date of Birth:
            <input
              name="dob"
              type="date"
              value={inputValue.dob}
              onChange={onChangeHandler}
            />
          </label>
        </section>
        <section className={styles.AdditionalInfo}>
          <label>
            <p>Observation:</p>
            <textarea
              name="observation"
              rows="8"
              cols="80"
              value={inputValue.observation}
              onChange={onChangeHandler}
            />
          </label>
          <section className={styles.WorkingDays}>
            <h3>Select day of visit:</h3>
            <label>
              <p>Day:</p>
              <select
                name="days"
                value={inputValue.days}
                onChange={onChangeHandler}
              >
                {workingDays.map((day, i) => {
                  return (
                    <option key={i} value={i}>
                      {day.substr(2)}
                    </option>
                  );
                })}
              </select>
            </label>
          </section>
          <section className={styles.WorkingHours}>
            <h3>Select time of visit:</h3>
            <label>
              <p>Hours:</p>
              <select
                name="hours"
                value={inputValue.hours}
                onChange={onChangeHandler}
              >
                {workingHours.map((hour, i) => {
                  return (
                    <option key={i} value={i}>
                      {hour.substr(0, hour.length - 3)}
                    </option>
                  );
                })}
              </select>
            </label>
            <label>
              <p>Minutes:</p>
              <select
                name="minutes"
                value={inputValue.minutes}
                onChange={onChangeHandler}
              >
                <option value={0}>0</option>
                <option value={15}>15</option>
                <option value={30}>30</option>
                <option value={45}>45</option>
              </select>
            </label>
            <h3>Treatment duration:</h3>
            <label>
              <p>Minutes: </p>
              <input
                type="number"
                name="duration"
                min="30"
                max={workingHours.length * 60}
                placeholder="30"
                value={inputValue.duration}
                onChange={onChangeHandler}
              />
            </label>
          </section>
        </section>
      </main>
      <button onClick={changeFormPageHandler} type="button">
        {!isFormPageChanged ? "NEXT" : "BACK"}
      </button>
      <button type="submit">{isAddMode ? "ADD" : "EDIT"}</button>
    </form>
  );
};

export default AddEditPatientForm;
