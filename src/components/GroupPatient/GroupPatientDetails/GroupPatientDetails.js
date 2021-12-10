import styles from "./GroupPatientDetails.module.scss";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import AppContext from "../../../store/AppProvider";
import maleAvatar from "../../../assets/img/male_avatar.svg";
import femaleAvatar from "../../../assets/img/female_avatar.svg";
import { getAge } from "../../../helpers/getAge";

const GroupPatientDetails = () => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const appCtx = useContext(AppContext);
  const { groupPatients } = appCtx;

  const { id } = useParams();

  const targetedPatient = groupPatients.find((patient) => patient.id === id);

  const age = getAge(targetedPatient.dateOfBirth);
  const optionsClickHandler = () => {
    setIsOptionsOpen((prevValue) => !prevValue);
  };

  const deleteHandler = () => {
    console.log("DELETE HANDLER!");
  };

  return (
    <section className={styles.PatientDetailsWrapper}>
      <header>
        <div>
          <img
            src={targetedPatient.gender === "male" ? maleAvatar : femaleAvatar}
            alt="avatar"
          />
        </div>
        <button onClick={optionsClickHandler} className={styles.OptionsBtn}>
          <i className="fas fa-ellipsis-h"></i>
        </button>
        <ul
          onClick={optionsClickHandler}
          className={
            !isOptionsOpen
              ? styles.Options
              : [styles.Options, styles["active"]].join(" ")
          }
        >
          <li onClick={deleteHandler}>Delete</li>
        </ul>
      </header>
      <main>
        <h2>{`${targetedPatient.firstName} ${targetedPatient.lastName}`}</h2>
        <p>
          <i className="fas fa-map-marker-alt"></i>
          {`${targetedPatient.address}, ${targetedPatient.city}`}
        </p>
        <p>
          <i className="fas fa-calendar-check"></i>
          {`Age: ${age}`}
        </p>
        <p>
          <i className="fas fa-phone-square"></i>
          {`Phone: ${targetedPatient.phone}`}
        </p>
        <p>
          <i className="fas fa-envelope-square"></i>
          {`Email: ${targetedPatient.email}`}
        </p>
        <p>
          <i className="fas fa-user-circle"></i>
          {`Date acquired: ${targetedPatient.date}`}
        </p>
        <div className={styles.Observation}>
          <h2>Observation:</h2>
          <p>{targetedPatient.observation}</p>
        </div>
      </main>
    </section>
  );
};

export default GroupPatientDetails;
