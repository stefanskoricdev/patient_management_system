import ReactDOM from "react-dom";
import styles from "../LoginInfo/LoginInfo.module.scss";
import character from "../../../assets/img/guy_with_glasses.svg";
import { Fragment } from "react";

const LoginInfo = ({ handleClick }) => {
  const LoginInfoEl = (
    <section className={styles.LoginInfoWrapper}>
      <section className={styles.LoginInfoContent}>
        <img src={character} alt="desk-illustration" />
        <h2>Hello visitor</h2>
        <p>
          I would like to thank you for visiting my demo app. I hope you will
          enjoy using it.
        </p>
        <ul>
          <p>To log in please use listed credentials:</p>
          <li>
            Email: <span>admin@admin.com</span>
          </li>
          <li>
            Password: <span>admin123</span>
          </li>
        </ul>
        <p>
          To check source code please visit my github repo:{" "}
          <a
            href="https://github.com/stefanskoricdev/patient_management_system"
            target="_blank"
            rel="noreferrer"
          >
            Link
          </a>
        </p>
        <p>*NOTE: Carefully read README file for detailed info about app.</p>
        <button onClick={handleClick}>Proceed</button>
      </section>
    </section>
  );
  return (
    <Fragment>
      {ReactDOM.createPortal(
        LoginInfoEl,
        document.getElementById("login-modal")
      )}
    </Fragment>
  );
};

export default LoginInfo;
