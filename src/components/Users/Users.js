import styles from "./Users.module.scss";
import {
  NavLink,
  Route,
  Switch,
  Redirect,
  useRouteMatch,
} from "react-router-dom";
import UsersList from "./UsersList/UsersList";
import AddEditUser from "./AddEditUser/AddEditUser";

const Users = () => {
  const { path } = useRouteMatch();

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
          <Route path={path} exact>
            <Redirect to={`${path}/users-list`} />
          </Route>
          <Route path={`${path}/users-list`}>
            <UsersList rootPath={path} />
          </Route>
          <Route path={`${path}/add-user`}>
            <AddEditUser />
          </Route>
          <Route path={`${path}/edit-user/:id`}>
            <AddEditUser rootPath={path} />
          </Route>
          <Route path="*">
            <Redirect to={`${path}/users-list`} />
          </Route>
        </Switch>
      </main>
    </section>
  );
};

export default Users;
