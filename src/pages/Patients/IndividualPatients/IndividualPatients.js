import styles from "./IndividualPatients.module.scss";
import { Route, Switch, NavLink, Redirect } from "react-router-dom";
import { Fragment, useContext } from "react";
import IndividualScheduler from "../../../components/IndividualScheduler/IndividualScheduler";
import AppContext from "../../../store/AppProvider";

const IndividualPatients = () => {
  const appCtx = useContext(AppContext);
  const { physios, individualPatients, individualCollection, isLoading } =
    appCtx;

  const individualPhysios = physios.filter(
    (physio) => physio.physioType === "individual"
  );

  return (
    <section className={styles.IndividualWrapper}>
      <header className={styles.Header}>
        <h1>Individual</h1>
      </header>
      {individualPhysios.length > 0 && (
        <Fragment>
          <nav className={styles.Nav}>
            {individualPhysios.map((physio) => {
              return (
                <NavLink
                  key={physio.id}
                  activeClassName={styles.active}
                  to={`/patients/individual-patients/${physio.firstName.toLowerCase()}${physio.lastName.toLowerCase()}`}
                >
                  <span>{physio.firstName}</span>
                  <span>{physio.lastName}</span>
                  <i className="fas fa-caret-up"></i>
                </NavLink>
              );
            })}
          </nav>
          <main className={styles.Main}>
            <Switch>
              <Route path="/patients/individual-patients/" exact>
                <Redirect
                  to={`/patients/individual-patients/${individualPhysios[0].firstName.toLowerCase()}${individualPhysios[0].lastName.toLowerCase()}`}
                />
              </Route>
              {individualPhysios.map((physio) => {
                return (
                  <Route
                    key={physio.id}
                    path={`/patients/individual-patients/${physio.firstName.toLowerCase()}${physio.lastName.toLowerCase()}`}
                  >
                    <IndividualScheduler
                      key={physio.id}
                      physiotherapist={physio}
                      individualCollection={individualCollection}
                      individualPatients={individualPatients}
                      isLoading={isLoading}
                    />
                  </Route>
                );
              })}
              <Route path="*">
                <Redirect
                  to={`/patients/individual-patients/${individualPhysios[0].firstName.toLowerCase()}${individualPhysios[0].lastName.toLowerCase()}`}
                />
              </Route>
            </Switch>
          </main>
        </Fragment>
      )}
      {individualPhysios.length < 1 && (
        <section className={styles.Message}>
          <p>No available physios!</p>
          <p>Please create your first physio.</p>
        </section>
      )}
    </section>
  );
};

export default IndividualPatients;
