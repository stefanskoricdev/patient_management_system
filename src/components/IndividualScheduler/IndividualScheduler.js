import styles from "./IndividualScheduler.module.scss";
import { useContext } from "react";
import {
  NavLink,
  Route,
  Redirect,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import AppContext from "../../store/AppProvider";
import IndividualSchedule from "./IndividualSchedule/IndividualSchedule";
import AddPatientModal from "../UI/AddPatientModal/AddPatientModal";
import PatientDetailsModal from "../UI/PatientDetailsModal/PatientDetailsModal";

const IndividualScheduler = ({ physiotherapist }) => {
  const { path } = useRouteMatch();

  const appCtx = useContext(AppContext);
  const { individualPatients } = appCtx;

  const filteredPatients = individualPatients.filter(
    (patient) => patient.physiotherapist === physiotherapist.firstName
  );
  // getData() in App Provider fetches data from firebase and adds it to patients state
  // which is sent in this component through appContext and then filtered according
  //to which physio this component belongs to (we get that trough props).
  //This way we avoid data being fetched every time we click physio tab!
  const workingDays = physiotherapist.workingDays.map((day, i) => (
    <li key={i}>{day.substr(2)}</li>
  ));
  const workingHours = physiotherapist.workingHours.map((time, i) => (
    <li key={i}>{time}</li>
  ));

  return (
    <section className={styles.Scheduler}>
      <nav className={styles.Nav}>
        <NavLink
          activeClassName={styles.active}
          to={`${path}/schedule`}
          className={styles.Link}
        >
          <i className="fas fa-calendar-alt"></i>
        </NavLink>
        <NavLink
          activeClassName={styles.active}
          to={`${path}/add-patient`}
          className={styles.Link}
        >
          <i className="fas fa-calendar-plus"></i>
        </NavLink>
      </nav>
      <main>
        <Switch>
          <Route path={`${path}/`} exact>
            <Redirect to={`${path}/schedule`} />
          </Route>
          <Route path={`${path}/schedule`}>
            <IndividualSchedule
              patients={filteredPatients}
              workingDays={workingDays}
              workingHours={workingHours}
              physiotherapist={physiotherapist.firstName}
            />
          </Route>
          <Route path={`${path}/add-patient`}>
            <AddPatientModal physiotherapist={physiotherapist} />
          </Route>
          <Route path={`${path}/:id`}>
            <PatientDetailsModal />
          </Route>
          <Route path="*">
            <Redirect to={`${path}`} />
          </Route>
        </Switch>
      </main>
    </section>
  );
};

export default IndividualScheduler;
