import styles from "./GroupPatients.module.scss";
import { Route, Switch, NavLink, Redirect } from "react-router-dom";
import GroupsScheduler from "../../../components/GroupsScheduler/GroupsScheduler";
import comingSoon from "../../../assets/img/coming_soon.png";
const physioConfig = [
  {
    id: "p1",
    firstName: "Stefan",
    workingHours: ["19:00", "20:00"],
    workingDays: ["MON/THU", "TUE/FRI"],
  },
  {
    id: "p2",
    firstName: "Sara",
    workingHours: ["21:00/ 19:00"],
    workingDays: ["MON/WED"],
  },
];

const Groups = () => {
  return (
    <section className={styles.GroupsWrapper}>
      <header className={styles.Header}>
        <h1>Groups</h1>
      </header>
      {/* <nav className={styles.Nav}>
        {physioConfig.map((physio) => {
          return (
            <NavLink
              key={physio.id}
              activeClassName={styles.active}
              to={`/patients/group-patients/${physio.firstName.toLowerCase()}`}
            >
              {physio.firstName}
              <i className="fas fa-caret-up"></i>
            </NavLink>
          );
        })}
      </nav> */}
      {/* <main className={styles.Main}>
        <Switch>
          <Route path="/patients/group-patients/" exact>
            <Redirect
              to={`/patients/group-patients/${physioConfig[0].firstName.toLowerCase()}`}
            />
          </Route>
          {physioConfig.map((physio) => {
            return (
              <Route
                key={physio.id}
                path={`/patients/group-patients/${physio.firstName.toLowerCase()}`}
              >
                <GroupsScheduler
                  key={physio.id}
                  physiotherapist={physio.firstName}
                  config={physioConfig.filter(
                    (config) => config.id === physio.id
                  )}
                />
              </Route>
            );
          })}
          <Route path="*">
            <Redirect
              to={`/patients/group-patients/${physioConfig[0].firstName.toLowerCase()}`}
            />
          </Route>
        </Switch>
      </main> */}
      <img src={comingSoon} alt="cooming-soon"></img>
    </section>
  );
};

export default Groups;
