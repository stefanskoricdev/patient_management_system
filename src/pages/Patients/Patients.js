import styles from "./Patients.module.scss";
import { Route, Switch, NavLink, Redirect } from "react-router-dom";
import getTime from "../../helpers/getTime";
import Individual from "./Individual/Individual";
import Groups from "./Groups/Groups";
import PatientsList from "../../components/PatientsList/PatientsList";

const Patients = () => {
  const currentTime = getTime();

  return (
    <section className={styles.Patients}>
      <header className={styles.Header}>
        <h1>Patients</h1>
        <p>{currentTime}</p>
      </header>
      <nav className={styles.Nav}>
        <NavLink
          activeClassName={styles.active}
          className={styles.PatientsLink}
          to="/patients/patients-list"
        >
          Patients List
          <i className="fas fa-caret-up"></i>
        </NavLink>
        <NavLink
          activeClassName={styles.active}
          className={styles.PatientsLink}
          to="/patients/individual"
        >
          Individual
          <i className="fas fa-caret-up"></i>
        </NavLink>
        <NavLink
          activeClassName={styles.active}
          className={styles.PatientsLink}
          to="/patients/groups"
        >
          Groups
          <i className="fas fa-caret-up"></i>
        </NavLink>
      </nav>
      <main className={styles.Main}>
        <Switch>
          <Route path="/patients/" exact>
            <Redirect to="/patients/patients-list" />
          </Route>
          <Route path="/patients/patients-list">
            <PatientsList />
          </Route>
          <Route path="/patients/individual">
            <Individual />
          </Route>
          <Route path="/patients/groups">
            <Groups />
          </Route>
        </Switch>
      </main>
    </section>
  );
};
export default Patients;
