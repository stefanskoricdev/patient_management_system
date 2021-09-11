import styles from "./Settings.module.scss";
import getTime from "../../helpers/getTime";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import AddUserModal from "../../components/UI/AddUserModal/AddUserModal";
import UsersList from "../../components/Users/UsersList/UsersList";

const Settings = () => {
  const currentTime = getTime();

  return (
    <section className={styles.Settings}>
      <header className={styles.Header}>
        <div className={styles.Title}>
          <h1>Settings</h1>
          <p>{currentTime}</p>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink activeClassName={styles.active} to="/settings/">
                <i className="fas fa-long-arrow-alt-left"></i>
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={styles.active} to="/settings/add-user">
                <i className="fas fa-user-plus"></i>
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.Main}>
        <Switch>
          <Route path="/settings/" exact>
            <Redirect to="/settings/users-list" />
          </Route>
          <Route path="/settings/users-list">
            <UsersList />
          </Route>
          <Route path="/settings/add-user">
            <AddUserModal />
          </Route>
        </Switch>
      </main>
    </section>
  );
};
export default Settings;
