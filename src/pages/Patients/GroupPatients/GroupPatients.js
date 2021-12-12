import styles from "./GroupPatients.module.scss";
import { useContext, Fragment } from "react";
import { Route, Switch, NavLink, Redirect } from "react-router-dom";
import GroupsScheduler from "../../../components/GroupsScheduler/GroupsScheduler";
import AppContext from "../../../store/AppProvider";

const Groups = () => {
  const appCtx = useContext(AppContext);
  const { physios } = appCtx;

  const groupPhysios = physios.filter(
    (physio) => physio.physioType === "group"
  );

  return (
    <section className={styles.GroupsWrapper}>
      <header className={styles.Header}>
        <h1>Groups</h1>
      </header>
      {groupPhysios.length > 0 && (
        <Fragment>
          <nav className={styles.Nav}>
            {groupPhysios.map((physio) => {
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
          </nav>
          <main className={styles.Main}>
            <Switch>
              <Route path="/patients/group-patients/" exact>
                <Redirect
                  to={`/patients/group-patients/${groupPhysios[0].firstName.toLowerCase()}`}
                />
              </Route>
              {groupPhysios.map((physio) => {
                return (
                  <Route
                    key={physio.id}
                    path={`/patients/group-patients/${physio.firstName.toLowerCase()}`}
                  >
                    <GroupsScheduler key={physio.id} physiotherapist={physio} />
                  </Route>
                );
              })}
              <Route path="*">
                <Redirect
                  to={`/patients/group-patients/${groupPhysios[0].firstName.toLowerCase()}`}
                />
              </Route>
            </Switch>
          </main>
        </Fragment>
      )}
      {groupPhysios.length < 1 && (
        <section className={styles.Message}>
          <p>No available physios!</p>
          <p>Please create your first physio.</p>
        </section>
      )}
    </section>
  );
};

export default Groups;
