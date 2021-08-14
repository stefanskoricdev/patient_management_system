import styles from "./Individual.module.scss";
import { Route, Switch, NavLink, Redirect } from "react-router-dom";
import IndividualScheduler from "../../../components/IndividualScheduler/IndividualScheduler";
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
            <IndividualScheduler physiotherapist={"Dijana"} />
          </Route>
          <Route path="/patients/individual/marko">
            <IndividualScheduler physiotherapist={"Marko"} />
          </Route>
          <Route path="/patients/individual/stefan">
            <IndividualScheduler physiotherapist={"Stefan"} />
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
