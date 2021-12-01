import styles from "./GroupsScheduler.module.scss";
import { useContext } from "react";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import Loader from "../UI/Loader/Loader";
import AppContext from "../../store/AppProvider";
import GroupSchedule from "./GroupsSchedule/GroupsSchedule";
import AddGroupPatient from "../GroupPatient/AddGroupPatient/AddGroupPatient";

const GroupsScheduler = ({ physiotherapist }) => {
  const appCtx = useContext(AppContext);
  const { isLoading } = appCtx;

  const { path } = useRouteMatch();

  return (
    <section className={styles.SchedulerWrapper}>
      {isLoading && <Loader />}
      <main>
        <Switch>
          <Route path={`${path}/`} exact>
            <Redirect to={`${path}/schedule`} />
          </Route>
          <Route path={`${path}/schedule`}>
            <GroupSchedule physiotherapist={physiotherapist} />
          </Route>
          <Route path={`${path}/add-group-patient/:id`}>
            <AddGroupPatient />
          </Route>
        </Switch>
      </main>
    </section>
  );
};
export default GroupsScheduler;
