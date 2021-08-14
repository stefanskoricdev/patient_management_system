import styles from "./Groups.module.scss";
import { Route, Switch, NavLink, Redirect } from "react-router-dom";
import GroupsScheduler from "../../../components/GroupsScheduler/GroupsScheduler";
import getTime from "../../../helpers/getTime";

const stefanConfig = {
  days: ["MON/THU", "TUE/FRI"],
  time: ["19:00", "20:00"],
};
const saraConfig = {
  days: ["MON/WED"],
  time: ["21:00/ 19:00"],
};

const Groups = () => {
  const currentTime = getTime();
  return (
    <section className={styles.GroupsWrapper}>
      <header className={styles.Header}>
        <h2>Groups</h2>
        <p>{currentTime}</p>
      </header>
      <nav className={styles.Nav}>
        <NavLink activeClassName={styles.active} to="/patients/groups/stefan">
          Stefan
        </NavLink>
        <NavLink activeClassName={styles.active} to="/patients/groups/sara">
          Sara
        </NavLink>
      </nav>
      <main className={styles.Main}>
        <Switch>
          <Route path="/patients/groups/" exact>
            <Redirect to="/patients/groups/stefan" />
          </Route>
          <Route path="/patients/groups/stefan">
            <GroupsScheduler physiotherapist={"Stefan"} config={stefanConfig} />
          </Route>
          <Route path="/patients/groups/sara">
            <GroupsScheduler physiotherapist={"Sara"} config={saraConfig} />
          </Route>
          <Route path="*">
            <Redirect to="/patients/groups/stefan" />
          </Route>
        </Switch>
      </main>
    </section>
  );
};

export default Groups;
