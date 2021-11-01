import styles from "./AddEditPhysioForm.module.scss";
import { useState, useContext, useEffect } from "react";
import { sendData, updateData } from "../../../actions/actions";
import { useHistory, useRouteMatch } from "react-router-dom";
import uuid from "react-uuid";
import AppContext from "../../../../store/AppProvider";
import firebase from "firebase/app";
import FormInput from "../../../UI/Forms/FormInput/FormInput";
import validateForm from "../../../../helpers/validateForm";
import { Fragment } from "react";

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

const AddEditPhysioForm = ({ rootPath }) => {
  const history = useHistory();
  const {
    params: { id },
  } = useRouteMatch();

  const appCtx = useContext(AppContext);
  const { setPhysios, physiosCollection, physios, setIsLoading } = appCtx;

  const isAddMode = !id;

  let initialValue = {
    firstName: "Test",
    lastName: "Test",
    email: "test@test.com",
    phoneNumber: "065123123",
  };
  let initialDaysValue = [];
  let initialHoursValue = [];
  let initialDaysCheckValue = new Array(workingDays.length).fill(false);
  let initialHoursCheckValue = new Array(workingHours.length).fill(false);
  let physioToEdit;

  if (physios.length < 1 && !isAddMode) history.push(rootPath);
  //This prevents issues if reloading page in !isAddMode!

  if (!isAddMode && physios.length > 0) {
    physioToEdit = physios.find((physio) => physio.id === id);
    const dayIndex = physioToEdit.workingDays.map((day) => {
      const index = day.indexOf("_");
      return day.substr(0, index);
    });
    const hoursIndex = physioToEdit.workingHours.map((hours) => {
      const index = hours.indexOf("_");
      return hours.substr(0, index);
    });
    initialValue = {
      firstName: physioToEdit.firstName,
      lastName: physioToEdit.lastName,
      email: physioToEdit.email,
      phoneNumber: physioToEdit.phoneNumber,
    };
    initialDaysValue = [...physioToEdit.workingDays];
    initialHoursValue = [...physioToEdit.workingHours];
    dayIndex.forEach((index) => {
      const transformedIndex = parseInt(index);
      initialDaysCheckValue[transformedIndex] = true;
    });
    hoursIndex.forEach((index) => {
      const transformedIndex = parseInt(index);
      initialHoursCheckValue[transformedIndex] = true;
    });
  }

  const [inputValues, setInputValues] = useState(initialValue);

  const [daysInputValue, setDaysInputValue] = useState(initialDaysValue);
  const [daysCheckedState, setDaysCheckedState] = useState(
    initialDaysCheckValue
  );

  const [hoursInputValue, setHoursInputValue] = useState(initialHoursValue);
  const [hoursCheckedState, setHoursCheckedState] = useState(
    initialHoursCheckValue
  );

  const basicInfoInputs = [
    {
      label: "First Name:",
      name: "firstName",
      type: "text",
      value: inputValues.firstName,
    },
    {
      label: "Last Name:",
      name: "lastName",
      type: "text",
      value: inputValues.lastName,
    },
    { label: "Email:", name: "email", type: "email", value: inputValues.email },
    {
      label: "Phone Number:",
      name: "phoneNumber",
      type: "tel",
      value: inputValues.phoneNumber,
    },
  ];

  const handleBasicInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => {
      return { ...prevValues, [name]: value };
    });
  };

  const handleCheckboxChange = (
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

  const submitHandler = (e) => {
    e.preventDefault();
    const validate = validateForm(inputValues, [
      hoursCheckedState,
      daysCheckedState,
    ]);

    if (!validate) return;

    const newPhysio = {
      id: isAddMode ? uuid() : id,
      firstName: inputValues.firstName,
      lastName: inputValues.lastName,
      email: inputValues.email,
      phoneNumber: inputValues.phoneNumber,
      workingDays: daysInputValue.sort(),
      workingHours: hoursInputValue.sort((a, b) => a > b),
      dateCreated: isAddMode
        ? firebase.firestore.FieldValue.serverTimestamp()
        : physioToEdit.dateCreated,
    };
    if (isAddMode) {
      sendData(setIsLoading, physiosCollection, newPhysio, setPhysios);
    } else {
      const targetedPhysioIndex = physios.findIndex(
        (physio) => physio.id === id
      );
      const updatedPhysioList = [...physios];
      updatedPhysioList[targetedPhysioIndex] = newPhysio;
      updateData(
        setIsLoading,
        physiosCollection,
        id,
        newPhysio,
        setPhysios,
        updatedPhysioList
      );
    }

    setDaysCheckedState(initialDaysCheckValue);
    setHoursCheckedState(initialHoursCheckValue);
    history.push(rootPath);
  };

  return (
    <Fragment>
      <form
        onSubmit={submitHandler}
        noValidate
        className={styles.AddEditPhysioForm}
      >
        <h2>{isAddMode ? "Add Physiotherapist" : "Edit Physiotherapist"}</h2>
        <div className={styles.BasicInfo}>
          {basicInfoInputs.map((info) => {
            const { label, name, type, value } = info;
            return (
              <FormInput
                key={name}
                label={label}
                name={name}
                type={type}
                value={value}
                onChange={handleBasicInputChange}
              />
            );
          })}
        </div>
        <div className={styles.WorkingDays}>
          <h3>Select working days:</h3>
          <main>
            {workingDays.map((day, i) => {
              return (
                <label key={i}>
                  {day}
                  <input
                    name={`${day}`}
                    value={`${i}_${day}`}
                    type="checkbox"
                    onChange={(event) => {
                      handleCheckboxChange(
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
                  {hour}
                  <input
                    name={`${hour}`}
                    value={`${i}_${hour}`}
                    type="checkbox"
                    onChange={(event) => {
                      handleCheckboxChange(
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
          <button className={styles.SubmitBtn}>
            {isAddMode ? "Add" : "Edit"}
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default AddEditPhysioForm;
