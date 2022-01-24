import styles from "./GroupsScheduler.module.scss";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import Loader from "../UI/Loader/Loader";
import GroupSchedule from "./GroupsSchedule/GroupsSchedule";
import AddEditGroupPatient from "../GroupPatient/AddEditGroupPatient/AddEditGroupPatient";
import GroupPatientDetails from "../GroupPatient/GroupPatientDetails/GroupPatientDetails";

const GroupsScheduler = ({ physiotherapist, isLoading, groupPatients }) => {
  const { path } = useRouteMatch();

  const filteredPatients = groupPatients.filter(
    (patient) => patient.physioId === physiotherapist.id
  );

  return (
    <section className={styles.SchedulerWrapper}>
      {isLoading && <Loader />}
      <main>
        <Switch>
          <Route path={`${path}/`} exact>
            <Redirect to={`${path}/schedule`} />
          </Route>
          <Route path={`${path}/schedule`}>
            <GroupSchedule
              patients={filteredPatients}
              physiotherapist={physiotherapist}
            />
          </Route>
          <Route path={`${path}/add-group-patient`}>
            <AddEditGroupPatient physiotherapist={physiotherapist} />
          </Route>
          <Route path={`${path}/edit-patient/:id`}>
            <AddEditGroupPatient physiotherapist={physiotherapist} />
          </Route>
          <Route path={`${path}/group-patient-details/:id`}>
            <GroupPatientDetails physiotherapist={physiotherapist} />
          </Route>
        </Switch>
      </main>
    </section>
  );
};
export default GroupsScheduler;
