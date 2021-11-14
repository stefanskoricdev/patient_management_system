import styles from "./Profile.module.scss";
import { useContext } from "react";
import { NavLink, Route, useRouteMatch, Redirect } from "react-router-dom";
import AppContext from "../../store/AppProvider";
import EditProfile from "../../components/UserProfile/EditProfile/EditProfile";
import ChangeEmailPassword from "../../components/UserProfile/ChangeEmailPassword/ChangeEmailPassword";

const Profile = () => {
  const appCtx = useContext(AppContext);
  const { currentDate } = appCtx;

  const { path } = useRouteMatch();

  return (
    <section className={styles.Profile}>
      <header className={styles.Header}>
        <h1>Profile</h1>
        <p>{currentDate}</p>
      </header>
      <main className={styles.Main}>
        <nav className={styles.Nav}>
          <NavLink to={`${path}/edit-profile`} activeClassName={styles.active}>
            Edit Profile<i className="fas fa-caret-up"></i>
          </NavLink>
          <NavLink to={`${path}/change-email`} activeClassName={styles.active}>
            Change Email<i className="fas fa-caret-up"></i>
          </NavLink>
          <NavLink
            to={`${path}/change-password`}
            activeClassName={styles.active}
          >
            Change Password<i className="fas fa-caret-up"></i>
          </NavLink>
        </nav>
        <section className={styles.MainContent}>
          <Route path={`${path}/`} exact>
            <Redirect to={`${path}/edit-profile`} />
          </Route>
          <Route path={`${path}/edit-profile`}>
            <EditProfile />
          </Route>
          <Route path={`${path}/change-email`}>
            <ChangeEmailPassword data="Email" />
          </Route>
          <Route path={`${path}/change-password`}>
            <ChangeEmailPassword data="Password" />
          </Route>
        </section>
      </main>
    </section>
  );
};

export default Profile;
