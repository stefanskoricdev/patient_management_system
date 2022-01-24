import styles from "./AddEditGroupPatientForm.module.scss";
import { useState, useContext, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { sendData, updateData } from "../../../actions/actions";
import AppContext from "../../../../store/AppProvider";
import firebase from "firebase/app";
import validateForm from "../../../../helpers/validateForm";

const AddEditGroupPatientForm = ({ physiotherapist }) => {
  const { query } = useLocation();
  const history = useHistory();
  const { id } = useParams();

  const appCtx = useContext(AppContext);
  const {
    currentDate,
    setIsLoading,
    groupsCollection,
    setGroupPatients,
    groupPatients,
  } = appCtx;

  const isAddMode = !id;

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
    type: "group",
  };
  let patientToEdit;

  if (!isAddMode) {
    patientToEdit = groupPatients.find((patient) => patient.id === id);
    const {
      firstName,
      lastName,
      gender,
      city,
      address,
      phone,
      email,
      dateOfBirth,
      observation,
    } = patientToEdit;
    initialValues = {
      firstName,
      lastName,
      gender,
      city,
      address,
      phoneNumber: phone,
      email,
      dob: dateOfBirth,
      observation,
      type: "group",
    };
  }

  const [isFormPageChanged, setIsFormPageChanged] = useState(false);
  const [inputValue, setInputValue] = useState(initialValues);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setInputValue((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const submitPatientHandler = (e) => {
    e.preventDefault();

    const validate = validateForm(inputValue);
    if (!validate) return;

    const {
      firstName,
      lastName,
      gender,
      city,
      address,
      phoneNumber,
      email,
      dob,
      observation,
      type,
    } = inputValue;
    const newGroupPatient = {
      id: isAddMode ? query.id : id,
      firstName,
      lastName,
      gender,
      city,
      address,
      phone: phoneNumber,
      email,
      dateOfBirth: dob,
      observation,
      physioId: physiotherapist.id,
      physiotherapist: {
        firstName: physiotherapist.firstName,
        lastName: physiotherapist.lastName,
      },
      appointment: isAddMode
        ? {
            time: query.time,
            day: query.day,
            slot: query.slot,
          }
        : patientToEdit.appointment,
      date: currentDate,
      dateCreated: isAddMode
        ? firebase.firestore.FieldValue.serverTimestamp()
        : patientToEdit.dateCreated,
      type: type,
    };

    if (isAddMode) {
      sendData(
        setIsLoading,
        groupsCollection,
        newGroupPatient,
        setGroupPatients
      );
    } else {
      const targetedPatientIndex = groupPatients.findIndex(
        (patient) => patient.id === newGroupPatient.id
      );
      const updatedPatientsList = [...groupPatients];
      updatedPatientsList[targetedPatientIndex] = newGroupPatient;
      updateData(
        setIsLoading,
        groupsCollection,
        id,
        newGroupPatient,
        setGroupPatients,
        updatedPatientsList
      );
    }

    history.push(
      `/patients/group-patients/${physiotherapist.firstName}${physiotherapist.lastName}`
    );
  };

  const changeFormPageHandler = () => {
    setIsFormPageChanged((prevValue) => !prevValue);
  };

  useEffect(() => {
    if (!query && !id) {
      history.push(
        `/patients/group-patients/${physiotherapist.firstName}${physiotherapist.lastName}`
      );
    }
  }, [query, history, physiotherapist.firstName, physiotherapist.lastName, id]);

  return (
    <form noValidate onSubmit={submitPatientHandler} className={styles.Form}>
      <header>
        <h2>{isAddMode ? "Create New Patient" : "Edit Patient"}</h2>
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
            <section className={styles.Observation}>
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
            </section>
          </section>
        </main>
        <button onClick={changeFormPageHandler} type="button">
          {!isFormPageChanged ? "NEXT" : "BACK"}
        </button>
        <button type="submit">{isAddMode ? "ADD" : "EDIT"}</button>
      </header>
    </form>
  );
};

export default AddEditGroupPatientForm;
