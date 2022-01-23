import styles from "./Patients.module.scss";
import {
  Route,
  Switch,
  NavLink,
  Redirect,
  useRouteMatch,
} from "react-router-dom";
import { useContext } from "react";
import IndividualPatients from "./IndividualPatients/IndividualPatients";
import GroupPatients from "./GroupPatients/GroupPatients";
import PatientsList from "./PatientsList/PatientsList";
import AppContext from "../../store/AppProvider";

const Patients = () => {
  const appCtx = useContext(AppContext);
  const { currentDate } = appCtx;

  const { path } = useRouteMatch();

  return (
    <section className={styles.Patients}>
      <header className={styles.Header}>
        <h1>Patients</h1>
        <p>{currentDate}</p>
      </header>
      <nav className={styles.Nav}>
        <NavLink
          activeClassName={styles.active}
          className={styles.PatientsLink}
          to={`${path}/patients-list`}
        >
          Patients List
          <i className="fas fa-caret-up"></i>
        </NavLink>
        <NavLink
          activeClassName={styles.active}
          className={styles.PatientsLink}
          to={`${path}/individual-patients`}
        >
          Individual
          <i className="fas fa-caret-up"></i>
        </NavLink>
        <NavLink
          activeClassName={styles.active}
          className={styles.PatientsLink}
          to={`${path}/group-patients`}
        >
          Groups
          <i className="fas fa-caret-up"></i>
        </NavLink>
      </nav>
      <main className={styles.Main}>
        <Switch>
          <Route path={`${path}`} exact>
            <Redirect to={`${path}/patients-list`} />
          </Route>
          <Route path={`${path}/patients-list`}>
            <PatientsList rootPath={path} />
          </Route>
          <Route path={`${path}/individual-patients`}>
            <IndividualPatients />
          </Route>
          <Route path={`${path}/group-patients`}>
            <GroupPatients />
          </Route>
          <Route path="*">
            <Redirect to={`${path}`} />
          </Route>
        </Switch>
      </main>
    </section>
  );
};
export default Patients;
