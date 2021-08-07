import { Fragment, useContext } from "react";
import logo from "../../assets/img/logo.png";
import wave from "../../assets/img/wave.png";
import styles from "./Login.module.scss";
import AppContext from "../../store/appContext";
import Loader from "../../components/UI/Loader/Loader";
import LoginForm from "./LoginForm/LoginForm";

const Login = () => {
  const appCtx = useContext(AppContext);
  const { setIsLoading, isLoading } = appCtx;

  return (
    <Fragment>
      {isLoading && <Loader />}
      <section className={styles.LoginWrapper}>
        <img className={styles.Wave} src={wave} alt="wave" />
        <section className={styles.LoginImgWrapper}>
          <img className={styles.LoginImg} src={logo} alt="login" />
        </section>
        <LoginForm setLoading={setIsLoading} />
      </section>
    </Fragment>
  );
};

export default Login;
