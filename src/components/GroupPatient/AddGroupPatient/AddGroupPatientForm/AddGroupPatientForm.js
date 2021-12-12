import styles from "./AddGroupPatientForm.module.scss";
import { useState, useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import AppContext from "../../../../store/AppProvider";
import firebase from "firebase/app";
import { sendData } from "../../../actions/actions";
import validateForm from "../../../../helpers/validateForm";

const AddGroupPatientForm = ({ physiotherapist }) => {
  const { query } = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (!query) {
      history.push(`/patients/group-patients/${physiotherapist.firstName}`);
    }
  }, [query, history, physiotherapist.firstName]);

  const appCtx = useContext(AppContext);
  const { currentDate, setIsLoading, groupsCollection, setGroupPatients } =
    appCtx;

  const initialValues = {
    firstName: "",
    lastName: "",
    gender: "male",
    city: "",
    address: "",
    phoneNumber: "",
    email: "",
    dob: "",
    observation: "",
  };

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
    } = inputValue;
    const newGroupPatient = {
      id: query.id,
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
      physiotherapist: physiotherapist.firstName,
      appointment: {
        time: query.time,
        day: query.day,
        slot: query.slot,
      },
      date: currentDate,
      dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
    };

    sendData(setIsLoading, groupsCollection, newGroupPatient, setGroupPatients);
    history.push(`/patients/group-patients/${physiotherapist.firstName}`);
  };

  const changeFormPageHandler = () => {
    setIsFormPageChanged((prevValue) => !prevValue);
  };

  return (
    <form noValidate onSubmit={submitPatientHandler} className={styles.Form}>
      <header>
        <h2>Create New Patient</h2>
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
          </section>
        </main>
        <button onClick={changeFormPageHandler} type="button">
          {!isFormPageChanged ? "NEXT" : "BACK"}
        </button>
        <button type="submit">ADD</button>
      </header>
    </form>
  );
};

export default AddGroupPatientForm;
