import styles from "./IndividualScheduler.module.scss";
import { useState, useEffect } from "react";
import {
  NavLink,
  Route,
  Redirect,
  Switch,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import AddEditPatient from "../IndividualPatient/AddEditPatient/AddEditPatient";
import IndividualSchedule from "./IndividualSchedule/IndividualSchedule";
import PatientDetails from "../IndividualPatient/PatientDetails/PatientDetails";
import AddAppointment from "../IndividualPatient/AddAppointment/AddAppointment";

const IndividualScheduler = ({
  physiotherapist,
  individualPatients,
  individualCollection,
}) => {
  const [showAddPatientBtn, setShowAddPatientBtn] = useState(true);

  const { path } = useRouteMatch();

  const location = useLocation();

  const filteredPatients = individualPatients.filter(
    (patient) => patient.physioId === physiotherapist.id
  );

  useEffect(() => {
    if (location.pathname !== `${path}/schedule`) {
      setShowAddPatientBtn(false);
      return;
    }
    setShowAddPatientBtn(true);
  }, [location, path]);

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
          <p>Schedule</p>
        </NavLink>
        {showAddPatientBtn ? (
          <NavLink
            activeClassName={styles.active}
            to={`${path}/add-patient`}
            className={styles.Link}
          >
            <i className="fas fa-calendar-plus"></i>
            <p>Add Patient</p>
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
              physiotherapist={physiotherapist}
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
          <Route path={`${path}/add-appointment/:id`}>
            <AddAppointment physiotherapist={physiotherapist} />
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
