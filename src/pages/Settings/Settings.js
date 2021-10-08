import styles from "./Settings.module.scss";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import { useContext } from "react";
import Users from "../../components/Users/Users";
import Physios from "../../components/Physios/Physios";
import AppContext from "../../store/AppProvider";

const Settings = () => {
  const appCtx = useContext(AppContext);
  const { currentDate } = appCtx;

  return (
    <section className={styles.Settings}>
      <header className={styles.Header}>
        <h1>Settings</h1>
        <p>{currentDate}</p>
      </header>
      <nav className={styles.Nav}>
        <NavLink activeClassName={styles.active} to="/settings/users">
          Users
          <i className="fas fa-caret-up"></i>
        </NavLink>
        <NavLink activeClassName={styles.active} to="/settings/physios">
          Physios
          <i className="fas fa-caret-up"></i>
        </NavLink>
      </nav>
      <main className={styles.Main}>
        <Switch>
          <Route path="/settings" exact>
            <Redirect to="/settings/users" />
          </Route>
          <Route path="/settings/users">
            <Users />
          </Route>
          <Route path="/settings/physios">
            <Physios />
          </Route>
          <Route path="*">
            <Redirect to="/settings/users" />
          </Route>
        </Switch>
      </main>
    </section>
  );
};
export default Settings;
