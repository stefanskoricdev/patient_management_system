import { Fragment, useContext, useRef } from "react";
import logo from "../../assets/img/logo.png";
import wave from "../../assets/img/wave.png";
import styles from "./Login.module.scss";
import AuthContext from "../../store/AuthProvider";
import AppContext from "../../store/appContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loader from "../../components/UI/Loader/Loader";

const mySwal = withReactContent(Swal);

const Login = () => {
  const authCtx = useContext(AuthContext);
  const { login, setDisplayName } = authCtx;

  const appCtx = useContext(AppContext);
  const { setIsLoading, isLoading } = appCtx;

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDwe8xI8HnB482koRJHfsK9AGw5gkzhyEU";

    setIsLoading(true);
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            if (data && data.error && data.error.message) {
              let errorMessage;
              if (data.error.message === "EMAIL_NOT_FOUND") {
                errorMessage = "Email not found!";
              } else if (data.error.message === "INVALID_PASSWORD") {
                errorMessage = "Invalid password!";
              } else {
                errorMessage = "User account has been disabled";
              }
              throw new Error(errorMessage);
            }
          });
        }
      })
      .then((data) => {
        setDisplayName(data.email);
        login(data.idToken);
      })
      .catch((error) => {
        setIsLoading(false);
        mySwal.fire({
          title: "Something went wrong!",
          text: `${error}`,
          icon: "error",
          customClass: { container: "alert-modal" },
        });
      });
  };
  return (
    <Fragment>
      {isLoading && <Loader />}
      <section className={styles.LoginWrapper}>
        <img className={styles.Wave} src={wave} alt="wave" />
        <section className={styles.LoginImgWrapper}>
          <img className={styles.LoginImg} src={logo} alt="login" />
        </section>
        <section className={styles.FormWrapper}>
          <form onSubmit={submitHandler} className={styles.LoginForm}>
            <h2>Login to your account</h2>
            <label>
              <p>
                <i className="fas fa-envelope"></i> Email
              </p>
              <input
                type="text"
                name="email"
                placeholder="Type your email"
                ref={emailInputRef}
              />
            </label>
            <label>
              <p>
                <i className="fas fa-lock"></i> Password
              </p>
              <input
                type="password"
                name="password"
                placeholder="Type your password"
                ref={passwordInputRef}
              />
            </label>
            <button type="submit">Login</button>
          </form>
        </section>
      </section>
    </Fragment>
  );
};

export default Login;
