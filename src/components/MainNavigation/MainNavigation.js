import styles from "./MainNavigation.module.scss";
import { Fragment, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/img/logo_small.png";
import AuthContext from "../../store/AuthProvider";

const MainNavigation = ({ isNavBtnClicked }) => {
  const authCtx = useContext(AuthContext);
  const { logout, isAdmin } = authCtx;

  return (
    <Fragment>
      <nav
        className={
          isNavBtnClicked
            ? [styles.MainNav, styles["active"]].join(" ")
            : styles.MainNav
        }
      >
        <Link to="/" className={styles.Logo}>
          <img src={logo} alt="logo" />
        </Link>
        <ul className={styles.NavList}>
          <li>
            <NavLink activeClassName={styles.active} to="/home">
              <i className="fas fa-home"></i>
              <p>Home</p>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={styles.active} to="/patients">
              <i className="fas fa-hospital-user"></i>
              <p>Patients</p>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={styles.active} to="/notes">
              <i className="fas fa-tasks"></i>
              <p>Notes</p>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={styles.active} to="/profile">
              <i className="fas fa-user"></i>
              <p>Profile</p>
            </NavLink>
          </li>
          {isAdmin && (
            <li>
              <NavLink activeClassName={styles.active} to="/settings">
                <i className="fas fa-cog"></i>
                <p>Settings</p>
              </NavLink>
            </li>
          )}
          <li>
            <button onClick={logout} className={styles.Logout}>
              <i className="fas fa-sign-out-alt"></i>
              <p>Logout</p>
            </button>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default MainNavigation;
