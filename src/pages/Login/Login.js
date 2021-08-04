import logo from "../../assets/img/logo.png";
import wave from "../../assets/img/wave.png";
import styles from "./Login.module.scss";
const Login = () => {
  return (
    <section className={styles.LoginWrapper}>
      <img className={styles.Wave} src={wave} alt="wave" />
      <section className={styles.LoginImgWrapper}>
        <img className={styles.LoginImg} src={logo} alt="login" />
      </section>
      <section className={styles.FormWrapper}>
        <form className={styles.LoginForm}>
          <h2>Login to your account</h2>
          <label>
            <p>
              <i class="fas fa-user"></i> Username
            </p>
            <input
              type="text"
              name="username"
              placeholder="Type your username"
            />
          </label>
          <label>
            <p>
              <i class="fas fa-lock"></i> Password
            </p>
            <input
              type="password"
              name="password"
              placeholder="Type your password"
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </section>
    </section>
  );
};

export default Login;
