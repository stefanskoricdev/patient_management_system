import styles from "./AddEditPatientForm.module.scss";
import { useContext, useState, Fragment } from "react";
import { sendData, updateData } from "../../../actions/actions";
import { useHistory, useRouteMatch } from "react-router-dom";
import { WarningMessage } from "../../../UI/Messages/Messages";
import { checkAppointment } from "../../../../helpers/checkAppointment";
import AppContext from "../../../../store/AppProvider";
import firebase from "firebase/app";
import uuid from "react-uuid";
import validateForm from "../../../../helpers/validateForm";

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

  let initialValues = {
    firstName: "",
    lastName: "",
    gender: "male",
    city: "",
    address: "",
    phoneNumber: "",
    email: "",
    dob: "",
    observation: "",
    days: physiotherapist.workingDays[0],
    hours: physiotherapist.workingHours[0],
    minutes: "0",
    duration: "30",
    type: "individual",
  };
  let patientToEdit;
  let appointmentIndex;
  let transformedId;

  if (!isAddMode) {
    const findIndex = id.split("=").pop();
    transformedId = id.replace("index=", "").slice(0, -findIndex.length);
    patientToEdit = individualPatients.find(
      (patient) => patient.id === transformedId
    );
    appointmentIndex = parseInt(id.slice(id.length - 1));

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
      days: patientToEdit.appointment[appointmentIndex].day,
      hours: patientToEdit.appointment[appointmentIndex].hours,
      minutes: patientToEdit.appointment[appointmentIndex].minutes,
      duration: patientToEdit.appointment[appointmentIndex].duration,
      type: "individual",
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
      id: isAddMode ? uuid() : transformedId,
      firstName: inputValue.firstName,
      lastName: inputValue.lastName,
      city: inputValue.city,
      address: inputValue.address,
      gender: inputValue.gender,
      phone: inputValue.phoneNumber,
      email: inputValue.email,
      dateOfBirth: inputValue.dob,
      observation: inputValue.observation,
      physioId: physiotherapist.id,
      physiotherapist: {
        firstName: physiotherapist.firstName,
        lastName: physiotherapist.lastName,
      },
      appointment: isAddMode
        ? [
            {
              hours: inputValue.hours,
              minutes: inputValue.minutes,
              day: inputValue.days,
              duration: inputValue.duration,
              appointmentIndex: 0,
            },
          ]
        : patientToEdit.appointment.map((_, i) =>
            i === appointmentIndex
              ? {
                  hours: inputValue.hours,
                  minutes: inputValue.minutes,
                  day: inputValue.days,
                  duration: inputValue.duration,
                  appointmentIndex: 0,
                }
              : {
                  hours: patientToEdit.appointment[i].hours,
                  minutes: patientToEdit.appointment[i].minutes,
                  day: patientToEdit.appointment[i].day,
                  duration: patientToEdit.appointment[i].duration,
                  appointmentIndex: i,
                }
          ),
      date: currentDate,
      dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
      type: "individual",
    };

    const isAppointmentTaken = checkAppointment(
      individualPatients,
      physiotherapist,
      newPatient,
      isAddMode,
      appointmentIndex
    ).includes(true);

    if (isAppointmentTaken) {
      WarningMessage(
        "Sorry but this appointment is taken",
        "Please pick another day or time.",
        false,
        "Go back"
      );
      return;
    }

    if (isAddMode) {
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
      updateData(
        setIsLoading,
        individualCollection,
        transformedId,
        newPatient,
        setIndividualPatients,
        updatedPatientsList
      );
    }

    history.push(
      `/patients/individual-patients/${physiotherapist.firstName}${physiotherapist.lastName}`
    );
  };

  const formEL = (
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
            <label>
              Select gender:
              <select
                name="gender"
                value={inputValue.gender}
                onChange={onChangeHandler}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
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
          <section className={styles.Observation}>
            <h3>Observation:</h3>
            <label>
              <textarea
                name="observation"
                rows="8"
                cols="80"
                value={inputValue.observation}
                onChange={onChangeHandler}
              />
            </label>
          </section>
          <section className={styles.WorkingDays}>
            <h3>Select day of visit:</h3>
            <label>
              <p>Day:</p>
              <select
                name="days"
                value={inputValue.days}
                onChange={onChangeHandler}
              >
                {workingDays.map((day) => {
                  return (
                    <option key={day} value={day}>
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
                  const substrStartIndex = hour.indexOf("_") + 1;
                  return (
                    <option key={hour} value={hour}>
                      {hour.substr(substrStartIndex, 2)}
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

  return <Fragment>{formEL}</Fragment>;
};

export default AddEditPatientForm;
