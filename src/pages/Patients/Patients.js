import { Link } from "react-router-dom";
import styles from "./Patients.module.scss";
import getTime from "../../helpers/getTime";

const Patients = () => {
  const currentTime = getTime();
  return (
    <section className={styles.Patients}>
      <header className={styles.Header}>
        <h1>Patients</h1>
        <p>{currentTime}</p>
      </header>
      <main className={styles.Main}>
        <Link className={styles.PatientsLink} to="/patients/individual">
          <i className="fas fa-user-injured"></i>
          <p>Individual</p>
        </Link>
        <Link className={styles.PatientsLink} to="/patients/groups">
          <i className="fas fa-users"></i>
          <p>Groups</p>
        </Link>
      </main>
    </section>
  );
};
export default Patients;
