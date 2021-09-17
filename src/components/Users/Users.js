import styles from "./Users.module.scss";
import {
  NavLink,
  Route,
  Switch,
  Redirect,
  useRouteMatch,
} from "react-router-dom";
import UsersList from "./UsersList/UsersList";
import AddUserModal from "../UI/AddUserModal/AddUserModal";

const Users = () => {
  const { path, url } = useRouteMatch();

  return (
    <section className={styles.Users}>
      <nav className={styles.Nav}>
        <NavLink activeClassName={styles.active} to={`${path}/users-list`}>
          Users List<i className="fas fa-caret-up"></i>
        </NavLink>
        <NavLink activeClassName={styles.active} to={`${path}/add-user`}>
          Add user<i className="fas fa-caret-up"></i>
        </NavLink>
      </nav>
      <main>
        <Switch>
          <Route path={url} exact>
            <Redirect to={`${path}/users-list`} />
          </Route>
          <Route path={`${path}/users-list`}>
            <UsersList />
          </Route>
          <Route path={`${path}/add-user`}>
            <AddUserModal />
          </Route>
        </Switch>
      </main>
    </section>
  );
};

export default Users;
