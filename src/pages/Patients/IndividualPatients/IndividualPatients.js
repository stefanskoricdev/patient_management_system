import styles from "./IndividualPatients.module.scss";
import { Route, Switch, NavLink, Redirect } from "react-router-dom";
import { useContext } from "react";
import IndividualScheduler from "../../../components/IndividualScheduler/IndividualScheduler";
import AppContext from "../../../store/AppProvider";

const IndividualPatients = () => {
  const appCtx = useContext(AppContext);
  const { physios, individualPatients, individualCollection } = appCtx;

  const individualPhysios = physios.filter(
    (physio) => physio.physioType === "individual"
  );

  return (
    <section className={styles.IndividualWrapper}>
      <header className={styles.Header}>
        <h1>Individual</h1>
      </header>
      <nav className={styles.Nav}>
        {individualPhysios.map((physio) => {
          return (
            <NavLink
              key={physio.id}
              activeClassName={styles.active}
              to={`/patients/individual-patients/${physio.firstName.toLowerCase()}`}
            >
              {physio.firstName}
              <i className="fas fa-caret-up"></i>
            </NavLink>
          );
        })}
      </nav>
      <main className={styles.Main}>
        {individualPhysios.length > 0 && (
          <Switch>
            <Route path="/patients/individual-patients/" exact>
              <Redirect
                to={`/patients/individual-patients/${individualPhysios[0].firstName.toLowerCase()}`}
              />
            </Route>
            {individualPhysios.map((physio) => {
              return (
                <Route
                  key={physio.id}
                  path={`/patients/individual-patients/${physio.firstName.toLowerCase()}`}
                >
                  <IndividualScheduler
                    key={physio.id}
                    physiotherapist={physio}
                    individualCollection={individualCollection}
                    individualPatients={individualPatients}
                  />
                </Route>
              );
            })}
            <Route path="*">
              <Redirect
                to={`/patients/individual-patients/${individualPhysios[0].firstName.toLowerCase()}`}
              />
            </Route>
          </Switch>
        )}
        {individualPhysios.length < 1 && (
          <section className={styles.Message}>
            <p>No available physios!</p>
            <p>Please create your first physio.</p>
          </section>
        )}
      </main>
    </section>
  );
};

export default IndividualPatients;
