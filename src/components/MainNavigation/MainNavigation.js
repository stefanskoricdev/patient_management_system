import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import styles from "./MainNavigation.module.scss";
import logo from "../../assets/img/logo.png";
import { useContext } from "react";
import AppContext from "../../store/appContext";

const MainNavigation = (props) => {
  const appCtx = useContext(AppContext);
  const { isNavBtnClicked } = appCtx;
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
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={styles.active} to="/patients">
              <i className="fas fa-hospital-user"></i>
              Patients
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={styles.active} to="/tasks">
              <i className="fas fa-tasks"></i>
              Tasks
            </NavLink>
          </li>

          <button className={styles.Logout}>
            <i className="fas fa-sign-out-alt"></i>
            <p>Logout</p>
          </button>
        </ul>
      </nav>
    </Fragment>
  );
};

export default MainNavigation;
