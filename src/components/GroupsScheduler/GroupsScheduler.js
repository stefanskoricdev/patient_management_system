import styles from "./GroupsScheduler.module.scss";
import { useContext } from "react";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import Loader from "../UI/Loader/Loader";
import AppContext from "../../store/AppProvider";
import GroupSchedule from "./GroupsSchedule/GroupsSchedule";
import AddGroupPatient from "../GroupPatient/AddGroupPatient/AddGroupPatient";
import GroupPatientDetails from "../GroupPatient/GroupPatientDetails/GroupPatientDetails";

const GroupsScheduler = ({ physiotherapist }) => {
  const appCtx = useContext(AppContext);
  const { isLoading, groupPatients } = appCtx;

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
            <AddGroupPatient physiotherapist={physiotherapist} />
          </Route>
          <Route path={`${path}/group-patient-details/:id`}>
            <GroupPatientDetails />
          </Route>
        </Switch>
      </main>
    </section>
  );
};
export default GroupsScheduler;
