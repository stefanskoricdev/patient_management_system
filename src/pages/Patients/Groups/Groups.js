import styles from "./Groups.module.scss";
import { Route, Switch, NavLink, Redirect } from "react-router-dom";
import GroupsScheduler from "../../../components/GroupsScheduler/GroupsScheduler";
import getTime from "../../../helpers/getTime";

const physioConfig = [
  {
    id: "p1",
    name: "Stefan",
    workingHours: ["19:00", "20:00"],
    workingDays: ["MON/THU", "TUE/FRI"],
  },
  {
    id: "p2",
    name: "Sara",
    workingHours: ["21:00/ 19:00"],
    workingDays: ["MON/WED"],
  },
];

const Groups = () => {
  const currentTime = getTime();
  return (
    <section className={styles.GroupsWrapper}>
      <header className={styles.Header}>
        <h2>Groups</h2>
        <p>{currentTime}</p>
      </header>
      <nav className={styles.Nav}>
        {physioConfig.map((physio) => {
          return (
            <NavLink
              key={physio.id}
              activeClassName={styles.active}
              to={`/patients/groups/${physio.name.toLowerCase()}`}
            >
              {physio.name}
            </NavLink>
          );
        })}
      </nav>
      <main className={styles.Main}>
        <Switch>
          <Route path="/patients/groups/" exact>
            <Redirect
              to={`/patients/groups/${physioConfig[0].name.toLowerCase()}`}
            />
          </Route>
          {physioConfig.map((physio) => {
            return (
              <Route
                key={physio.id}
                path={`/patients/groups/${physio.name.toLowerCase()}`}
              >
                <GroupsScheduler
                  key={physio.id}
                  physiotherapist={physio.name}
                  config={physioConfig.filter(
                    (config) => config.id === physio.id
                  )}
                />
              </Route>
            );
          })}
          <Route path="*">
            <Redirect
              to={`/patients/groups/${physioConfig[0].name.toLowerCase()}`}
            />
          </Route>
        </Switch>
      </main>
    </section>
  );
};

export default Groups;
