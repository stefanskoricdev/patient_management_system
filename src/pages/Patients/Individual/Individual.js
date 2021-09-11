import styles from "./Individual.module.scss";
import { Route, Switch, NavLink, Redirect } from "react-router-dom";
import IndividualScheduler from "../../../components/IndividualScheduler/IndividualScheduler";
import getTime from "../../../helpers/getTime";

const Individual = () => {
  const currentTime = getTime();
  const physioConfig = [
    {
      id: "p1",
      name: "Dijana",
      workingHours: ["16:00", "17:00", "18:00", "19:00"],
      workingDays: ["MON", "TUE", "WED", "THU", "FRI"],
    },
    {
      id: "p2",
      name: "Marko",
      workingHours: [
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
      ],
      workingDays: ["MON", "TUE", "WED", "THU", "FRI"],
    },
    {
      id: "p3",
      name: "Stefan",
      workingHours: [
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
      ],
      workingDays: ["MON", "TUE", "WED", "THU", "FRI"],
    },
  ];

  return (
    <section className={styles.IndividualWrapper}>
      <header className={styles.Header}>
        <h2>Individual</h2>
        <p>{currentTime}</p>
      </header>
      <nav className={styles.Nav}>
        {physioConfig.map((physio, i) => {
          return (
            <NavLink
              key={physio.id}
              activeClassName={styles.active}
              to={`/patients/individual/${physio.name.toLowerCase()}`}
            >
              {physio.name}
              <i className="fas fa-caret-up"></i>
            </NavLink>
          );
        })}
      </nav>
      <main className={styles.Main}>
        <Switch>
          <Route path="/patients/individual/" exact>
            <Redirect
              to={`/patients/individual/${physioConfig[0].name.toLowerCase()}`}
            />
          </Route>
          {physioConfig.map((physio) => {
            return (
              <Route
                key={physio.id}
                path={`/patients/individual/${physio.name.toLowerCase()}`}
              >
                <IndividualScheduler
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
              to={`/patients/individual/${physioConfig[0].name.toLowerCase()}`}
            />
          </Route>
        </Switch>
      </main>
    </section>
  );
};

export default Individual;
