import styles from "./PatientDetails.module.scss";
import { useParams } from "react-router-dom";
import { useContext, Fragment } from "react";
import { getAge } from "../../../helpers/getAge";
import AppContext from "../../../store/AppProvider";
import maleAvatar from "../../../assets/img/male_avatar.svg";
import femaleAvatar from "../../../assets/img/female_avatar.svg";

const PatientDetails = () => {
  const { id } = useParams();
  const appCtx = useContext(AppContext);
  const { individualPatients } = appCtx;

  const targetedPatient = individualPatients
    .filter((patient) => patient.id === id)
    .map((pat, i) => {
      const age = getAge(pat.dateOfBirth);
      return (
        <Fragment key={i}>
          <header>
            <div>
              <img
                src={pat.gender === "male" ? maleAvatar : femaleAvatar}
                alt="avatar"
              />
            </div>
          </header>
          <main>
            <h2>{`${pat.firstName} ${pat.lastName}`}</h2>
            <p>
              <i className="fas fa-map-marker-alt"></i>
              {`${pat.address}, ${pat.city}`}
            </p>
            <p>
              <i className="fas fa-calendar-check"></i>
              {`Age: ${age}`}
            </p>
            <p>
              <i className="fas fa-phone-square"></i>
              {`Phone: ${pat.phone}`}
            </p>
            <p>
              <i className="fas fa-user-circle"></i>
              {`Date acquired: ${pat.date}`}
            </p>
            <div className={styles.Observation}>
              <h2>Observation:</h2>
              <p>{pat.observation}</p>
            </div>
          </main>
        </Fragment>
      );
    });
  return (
    <section className={styles.PatientDetailsWrapper}>
      {targetedPatient}
    </section>
  );
};

export default PatientDetails;
