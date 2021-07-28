import styles from "./Individual.module.scss";
import { Route, Switch, NavLink, Redirect } from "react-router-dom";
import Scheduler from "../../../components/Scheduler/Scheduler";

import getTime from "../../../helpers/getTime";
const Individual = () => {
  const currentTime = getTime();
  return (
    <section className={styles.IndividualWrapper}>
      <header className={styles.Header}>
        <h2>Individual</h2>
        <p>{currentTime}</p>
      </header>
      <nav className={styles.Nav}>
        <NavLink
          activeClassName={styles.active}
          to="/patients/individual/dijana"
        >
          Dijana
        </NavLink>
        <NavLink
          activeClassName={styles.active}
          to="/patients/individual/marko"
        >
          Marko
        </NavLink>
        <NavLink
          activeClassName={styles.active}
          to="/patients/individual/stefan"
        >
          Stefan
        </NavLink>
      </nav>
      <main className={styles.Main}>
        <Switch>
          <Route path="/patients/individual/" exact>
            <Redirect to="/patients/individual/dijana" />
          </Route>
          <Route path="/patients/individual/dijana">
            <Scheduler />
          </Route>
          <Route path="/patients/individual/marko">
            <h1>Marko Page</h1>
          </Route>
          <Route path="/patients/individual/stefan">
            <h1>Stefan Page</h1>
          </Route>
          <Route path="*">
            <Redirect to="/patients/individual/dijana" />
          </Route>
        </Switch>
      </main>
    </section>
  );
};

export default Individual;
