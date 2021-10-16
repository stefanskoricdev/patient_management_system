import styles from "./IndividualScheduler.module.scss";
import { useContext, useState } from "react";
import {
  NavLink,
  Route,
  Redirect,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import AppContext from "../../store/AppProvider";
import AddEditPatient from "../Patient/AddEditPatient/AddEditPatient";
import IndividualSchedule from "./IndividualSchedule/IndividualSchedule";
import PatientDetails from "../Patient/PatientDetails/PatientDetails";
import { useEffect } from "react/cjs/react.development";

const IndividualScheduler = ({ physiotherapist }) => {
  const [showAddPatientBtn, setShowAddPatientBtn] = useState(true);

  const { path } = useRouteMatch();

  const appCtx = useContext(AppContext);
  const { individualPatients, individualCollection } = appCtx;

  const { firstName, workingDays, workingHours } = physiotherapist;

  const filteredPatients = individualPatients.filter(
    (patient) => patient.physiotherapist === firstName
  );
  // getData() in App Provider fetches data from firebase and adds it to patients state
  // which is sent in this component through appContext and then filtered according
  //to which physio this component belongs to (we get that through props).
  //This way we avoid data being fetched every time we click physio tab!
  const workingDaysValue = workingDays.map((day, i) => (
    <li key={i}>{day.substr(2)}</li>
  ));
  const workingHoursValue = workingHours.map((time, i) => (
    <li key={i}>{time}</li>
  ));

  useEffect(() => {
    setShowAddPatientBtn(true);
  }, [individualPatients]);

  return (
    <section className={styles.Scheduler}>
      <nav className={styles.Nav}>
        <NavLink
          activeClassName={styles.active}
          to={`${path}/schedule`}
          className={styles.Link}
          onClick={() => {
            setShowAddPatientBtn(true);
          }}
        >
          <i className="fas fa-calendar-alt"></i>
        </NavLink>
        {showAddPatientBtn ? (
          <NavLink
            activeClassName={styles.active}
            to={`${path}/add-patient`}
            className={styles.Link}
          >
            <i className="fas fa-calendar-plus"></i>
          </NavLink>
        ) : null}
      </nav>
      <main>
        <Switch>
          <Route path={`${path}/`} exact>
            <Redirect to={`${path}/schedule`} />
          </Route>
          <Route path={`${path}/schedule`}>
            <IndividualSchedule
              patients={filteredPatients}
              workingDays={workingDaysValue}
              workingHours={workingHoursValue}
              physiotherapist={firstName}
            />
          </Route>
          <Route path={`${path}/add-patient`}>
            <AddEditPatient physiotherapist={physiotherapist} />
          </Route>
          <Route path={`${path}/patient-details/:id`}>
            <PatientDetails
              setShowAddPatient={setShowAddPatientBtn}
              physiotherapist={physiotherapist}
              collection={individualCollection}
            />
          </Route>
          <Route path={`${path}/edit-patient/:id`}>
            <AddEditPatient physiotherapist={physiotherapist} />
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
