import styles from "./GroupPatients.module.scss";
import { useContext, Fragment } from "react";
import { Route, Switch, NavLink, Redirect } from "react-router-dom";
import GroupsScheduler from "../../../components/GroupsScheduler/GroupsScheduler";
import AppContext from "../../../store/AppProvider";

const Groups = () => {
  const appCtx = useContext(AppContext);
  const { physios, groupPatients, isLoading } = appCtx;

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
                  to={`/patients/group-patients/${physio.firstName.toLowerCase()}${physio.lastName.toLowerCase()}`}
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
              <Route path="/patients/group-patients/" exact>
                <Redirect
                  to={`/patients/group-patients/${groupPhysios[0].firstName.toLowerCase()}${groupPhysios[0].lastName.toLowerCase()}`}
                />
              </Route>
              {groupPhysios.map((physio) => {
                return (
                  <Route
                    key={physio.id}
                    path={`/patients/group-patients/${physio.firstName.toLowerCase()}${physio.lastName.toLowerCase()}`}
                  >
                    <GroupsScheduler
                      key={physio.id}
                      physiotherapist={physio}
                      groupPatients={groupPatients}
                      isLoading={isLoading}
                    />
                  </Route>
                );
              })}
              <Route path="*">
                <Redirect
                  to={`/patients/group-patients/${groupPhysios[0].firstName.toLowerCase()}${groupPhysios[0].lastName.toLowerCase()}`}
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
