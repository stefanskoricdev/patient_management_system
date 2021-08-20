import styles from "./MainNavigation.module.scss";
import { Fragment, useContext } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import AppContext from "../../store/AppProvider";
import AuthContext from "../../store/AuthProvider";

const MainNavigation = () => {
  const appCtx = useContext(AppContext);
  const { isNavBtnClicked } = appCtx;

  const authCtx = useContext(AuthContext);
  const { logout } = authCtx;

  return (
    <Fragment>
      <nav
        className={
          isNavBtnClicked
            ? [styles.MainNav, styles["active"]].join(" ")
            : styles.MainNav
        }
      >
        <div className={styles.Logo}>
          <img src={logo} alt="logo" />
        </div>
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

          <button onClick={logout} className={styles.Logout}>
            <i className="fas fa-sign-out-alt"></i>
            <p>Logout</p>
          </button>
        </ul>
      </nav>
    </Fragment>
  );
};

export default MainNavigation;
