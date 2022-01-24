import styles from "./AddAppointment.module.scss";
import { Fragment, useContext, useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { checkAppointment } from "../../../helpers/checkAppointment";
import { WarningMessage } from "../../UI/Messages/Messages";
import { updateData } from "../../actions/actions";
import validateForm from "../../../helpers/validateForm";
import AppContext from "../../../store/AppProvider";

const AddAppointment = ({ physiotherapist }) => {
  const {
    params: { id },
  } = useRouteMatch();

  const findIndex = id.split("=").pop();
  const transformedId = id.replace("index=", "").slice(0, -findIndex.length);

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
    days: physiotherapist.workingDays[0],
    hours: physiotherapist.workingHours[0],
    minutes: "0",
    duration: patientToUpdate.appointment[0].duration,
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
      hours: inputValue.hours,
      minutes: inputValue.minutes,
      day: inputValue.days,
      duration: inputValue.duration,
      appointmentIndex: patientToUpdate.appointment.length,
    };

    const updatedPatientPosition = {
      appointment: [...patientToUpdate.appointment, { ...updatedAppointment }],
    };

    const isAppointmentTaken = checkAppointment(
      individualPatients,
      physiotherapist,
      updatedPatientPosition,
      false,
      updatedAppointment.appointmentIndex
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

    patientToUpdate.appointment.push(updatedAppointment);

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
      `/patients/individual-patients/${physiotherapist.firstName}${physiotherapist.lastName}/schedule`
    );
  };
  const formEl = (
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
            {workingHours.map((hour) => {
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
      </section>
      <button type="submit">ADD</button>
    </form>
  );

  return <Fragment>{formEl}</Fragment>;
};

export default AddAppointment;
