import styles from "./LoginForm.module.scss";
import { useContext, useRef } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AuthContext from "../../../store/AuthProvider";

const mySwal = withReactContent(Swal);

const ADMIN_ID = process.env.REACT_APP_ADMIN_ID;

const LoginForm = ({ setLoading }) => {
  const authCtx = useContext(AuthContext);
  const { login } = authCtx;

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const resetInput = () => {
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`;

    setLoading(true);
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
        setLoading(false);
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
        let admin = false;
        if (data.localId === ADMIN_ID) {
          admin = true;
        }
        login(data.idToken, data.email, admin);
      })
      .catch((error) => {
        resetInput();
        setLoading(false);
        mySwal.fire({
          title: "Something went wrong!",
          text: `${error}`,
          icon: "error",
          customClass: { container: "alert-modal" },
        });
      });
  };

  return (
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
  );
};

export default LoginForm;
