import styles from "./Login.module.scss";
import { Fragment, useContext, useState } from "react";
import logo from "../../assets/img/logo.png";
import wave from "../../assets/img/wave.png";
import AppContext from "../../store/AppProvider";
import Loader from "../../components/UI/Loader/Loader";
import LoginForm from "./LoginForm/LoginForm";
import LoginInfo from "./LoginInfo/LoginInfo";

const Login = () => {
  const appCtx = useContext(AppContext);
  const { setIsLoading, isLoading } = appCtx;

  const [showInfo, setShowInfo] = useState(true);

  const handleShowInfo = () => {
    setShowInfo(false);
  };

  return (
    <Fragment>
      {isLoading && <Loader />}
      <section className={styles.LoginWrapper}>
        <img className={styles.Wave} src={wave} alt="wave" />
        <section className={styles.LoginImgWrapper}>
          <img className={styles.LoginImg} src={logo} alt="login" />
        </section>
        <LoginForm setLoading={setIsLoading} />
        {showInfo && <LoginInfo handleClick={handleShowInfo} />}
      </section>
    </Fragment>
  );
};

export default Login;
