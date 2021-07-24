import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import styles from "./MainNavigation.module.scss";
import logo from "../../assets/img/logo.png";

const MainNavigation = (props) => {
  const { navBtnClicked } = props;
  return (
    <Fragment>
      <nav
        className={
          navBtnClicked
            ? [styles.MainNav, styles["active"]].join(" ")
            : styles.MainNav
        }
      >
        <div className={styles.Logo}>
          <img src={logo} alt="logo" />
        </div>
        <ul className={styles.NavList}>
          <li>
            <i className="fas fa-home"></i>
            <NavLink className={styles.NavLink} to="/home">
              Home
            </NavLink>
          </li>
          <li>
            <i className="fas fa-hospital-user"></i>
            <NavLink className={styles.NavLink} to="/patients">
              Patients
            </NavLink>
          </li>
          <li>
            <i className="fas fa-tasks"></i>
            <NavLink className={styles.NavLink} to="/tasks">
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
