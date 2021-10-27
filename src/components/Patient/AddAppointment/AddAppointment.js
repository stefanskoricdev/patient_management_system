import { useContext, useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import validateForm from "../../../helpers/validateForm";
import AppContext from "../../../store/AppProvider";
import { updateData } from "../../actions/actions";
import styles from "./AddAppointment.module.scss";

const AddAppointment = ({ physiotherapist }) => {
  const {
    params: { id },
  } = useRouteMatch();

  const transformedId = id.slice(0, -1);

  const history = useHistory();

  const appCtx = useContext(AppContext);
  const {
    setIsLoading,
    individualCollection,
    setIndividualPatients,
    individualPatients,
  } = appCtx;

  const patientToUpdate = individualPatients.find(
    (patient) => patient.id === transformedId
  );

  const initialValues = {
    days: "0",
    hours: "0",
    minutes: "0",
    duration: patientToUpdate.position[0].height,
  };
  const [inputValue, setInputValue] = useState(initialValues);

  const { workingDays, workingHours } = physiotherapist;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const validate = validateForm(inputValue);
    if (!validate) return;

    const updatedAppointment = {
      topHours: inputValue.hours,
      topMinutes: inputValue.minutes,
      left: inputValue.days,
      height: inputValue.duration,
    };

    patientToUpdate.position.push(updatedAppointment);

    const targetedPatientIndex = individualPatients.findIndex(
      (patient) => patient.id === patientToUpdate.id
    );
    const updatedPatientsList = [...individualPatients];
    updatedPatientsList[targetedPatientIndex] = patientToUpdate;

    updateData(
      setIsLoading,
      individualCollection,
      transformedId,
      patientToUpdate,
      setIndividualPatients,
      updatedPatientsList
    );
    history.push(
      `/patients/individual-patients/${physiotherapist.firstName}/schedule`
    );
  };
  return (
    <form className={styles.AddAppointmentForm} onSubmit={onSubmit}>
      <h2>Add appointment</h2>
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
              const substrStartIndex = hour.indexOf("_") + 1;
              return (
                <option key={i} value={i}>
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
        {/* <h3>Treatment duration:</h3>
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
        </label> */}
      </section>
      <button type="submit">ADD</button>
    </form>
  );
};

export default AddAppointment;
