import styles from "./MainHeader.module.scss";
import { useContext } from "react";
import AuthContext from "../../store/AuthProvider";

const MainHeader = ({ openNavHandler }) => {
  const authCtx = useContext(AuthContext);
  const { displayName } = authCtx;

  return (
    <header className={styles.MainHeader}>
      <button
        data-id="nav-btn"
        onClick={openNavHandler}
        className={styles.BurgerBtn}
      >
        <div data-id="nav-btn"></div>
        <div data-id="nav-btn"></div>
        <div data-id="nav-btn"></div>
      </button>
      <div className={styles.UserAvatar}>
        <p>{displayName}</p>
        <i className="fas fa-user"></i>
      </div>
    </header>
  );
};
export default MainHeader;
