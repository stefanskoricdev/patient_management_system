import styles from "./MainHeader.module.scss";
import { useContext } from "react";
import AppContext from "../../store/appContext";

const MainHeader = () => {
  const appCtx = useContext(AppContext);
  const { openNavHandler } = appCtx;

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
        <i className="fas fa-user"></i>
      </div>
    </header>
  );
};
export default MainHeader;
