import styles from "./Settings.module.scss";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import getTime from "../../helpers/getTime";

import Users from "../../components/Users/Users";
const Settings = () => {
  const currentTime = getTime();

  return (
    <section className={styles.Settings}>
      <header className={styles.Header}>
        <div className={styles.Title}>
          <h1>Settings</h1>
          <p>{currentTime}</p>
        </div>
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
            <h1>Physios page</h1>
          </Route>
        </Switch>
      </main>
    </section>
  );
};
export default Settings;
