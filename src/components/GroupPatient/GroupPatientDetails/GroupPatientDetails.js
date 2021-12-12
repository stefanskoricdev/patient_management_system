import styles from "./GroupPatientDetails.module.scss";
import { useParams, useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import AppContext from "../../../store/AppProvider";
import maleAvatar from "../../../assets/img/male_avatar.svg";
import femaleAvatar from "../../../assets/img/female_avatar.svg";
import { getAge } from "../../../helpers/getAge";
import { deleteData } from "../../actions/actions";

const GroupPatientDetails = () => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const appCtx = useContext(AppContext);
  const { groupPatients, setGroupPatients, setIsLoading, groupsCollection } =
    appCtx;

  const { id } = useParams();

  const history = useHistory();

  const targetedPatient = groupPatients.find((patient) => patient.id === id);

  const optionsClickHandler = () => {
    setIsOptionsOpen((prevValue) => !prevValue);
  };

  const deleteHandler = () => {
    deleteData(
      setIsLoading,
      setGroupPatients,
      groupsCollection,
      id,
      history,
      `/patients/group-patients/${targetedPatient.physiotherapist}`
    );
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
          {`Age: ${getAge(targetedPatient.dateOfBirth)}`}
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
