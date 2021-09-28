import styles from "./AddPhysioForm.module.scss";
import uuid from "react-uuid";
import { useState, useContext, useRef } from "react";
import { sendData } from "../../../actions/actions";
import AppContext from "../../../../store/AppProvider";
import firebase from "firebase/app";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const mySwal = withReactContent(Swal);

const workingDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const workingHours = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

const AddPhysioForm = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const phoneNumberRef = useRef();

  const initialDaysCheckValue = new Array(workingDays.length).fill(false);
  const [daysInputValue, setDaysInputValue] = useState([]);
  const [daysCheckedState, setDaysCheckedState] = useState(
    initialDaysCheckValue
  );

  const initialHoursCheckValue = new Array(workingHours.length).fill(false);
  const [hoursInputValue, setHoursInputValue] = useState([]);
  const [hoursCheckedState, setHoursCheckedState] = useState(
    initialHoursCheckValue
  );

  const appCtx = useContext(AppContext);
  const { setPhysios, physiosCollection, setIsLoading } = appCtx;

  const handleOnChange = (
    e,
    position,
    checkedState,
    setCheckedState,
    setInputValue,
    inputValue
  ) => {
    const updatedCheckedState = checkedState.map((item, i) =>
      i === position ? !item : item
    );
    setCheckedState(updatedCheckedState);

    if (e.target.checked) {
      setInputValue((prevValue) => [...prevValue, e.target.value]);
    } else {
      const findIndex = inputValue.findIndex(
        (value) => value === e.target.value
      );
      const updatedInputValue = inputValue.filter((day, i) =>
        i === findIndex ? null : day
      );
      setInputValue(updatedInputValue);
    }
  };

  const resetInputs = () => {
    firstNameRef.current.value = "";
    lastNameRef.current.value = "";
    emailRef.current.value = "";
    phoneNumberRef.current.value = "";
    setDaysCheckedState(initialDaysCheckValue);
    setHoursCheckedState(initialHoursCheckValue);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      firstNameRef.current.value.trim() === "" ||
      lastNameRef.current.value.trim() === "" ||
      emailRef.current.value.trim() === "" ||
      !hoursCheckedState.includes(true) ||
      !daysCheckedState.includes(true)
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
    const newPhysio = {
      id: uuid(),
      firstName: firstNameRef.current.value.trim(),
      lastName: lastNameRef.current.value.trim(),
      email: emailRef.current.value.trim(),
      phoneNumber: phoneNumberRef.current.value.trim(),
      workingDays: daysInputValue.sort(),
      workingHours: hoursInputValue.sort(),
      dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
    };
    sendData(setIsLoading, physiosCollection, newPhysio, setPhysios);
    resetInputs();
  };

  return (
    <form onSubmit={submitHandler} className={styles.AddPhysioForm}>
      <h2>Add Physiotherapist</h2>
      <div className={styles.BasicInfo}>
        <label>
          First Name:
          <input name="first-name" type="text" ref={firstNameRef} />
        </label>
        <label>
          Last Name:
          <input name="first-name" type="text" ref={lastNameRef} />
        </label>
        <label>
          Email:
          <input name="first-name" type="email" ref={emailRef} />
        </label>
        <label>
          Phone Number:
          <input
            name="phone-number"
            type="tel"
            pattern="[0-9]{3}[0-9]{3}[0-9]{3}"
            ref={phoneNumberRef}
          />
        </label>
      </div>
      <div className={styles.WorkingDays}>
        <h3>Select working days:</h3>
        <main>
          {workingDays.map((day, i) => {
            return (
              <label key={i}>
                <p>{day}</p>
                <input
                  name={`${day}`}
                  value={`${i}_${day}`}
                  type="checkbox"
                  onChange={(event) => {
                    handleOnChange(
                      event,
                      i,
                      daysCheckedState,
                      setDaysCheckedState,
                      setDaysInputValue,
                      daysInputValue
                    );
                  }}
                  checked={daysCheckedState[i]}
                />
              </label>
            );
          })}
        </main>
      </div>
      <div className={styles.WorkingHours}>
        <h3>Select working hours:</h3>
        <main>
          {workingHours.map((hour, i) => {
            return (
              <label key={i}>
                <p>{hour}</p>
                <input
                  name={`${hour}`}
                  value={`${hour}`}
                  type="checkbox"
                  onChange={(event) => {
                    handleOnChange(
                      event,
                      i,
                      hoursCheckedState,
                      setHoursCheckedState,
                      setHoursInputValue,
                      hoursInputValue
                    );
                  }}
                  checked={hoursCheckedState[i]}
                />
              </label>
            );
          })}
        </main>
        <button className={styles.AddPhysioBtn}>Add</button>
      </div>
    </form>
  );
};

export default AddPhysioForm;
