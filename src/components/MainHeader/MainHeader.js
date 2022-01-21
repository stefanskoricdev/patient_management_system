import styles from "./MainHeader.module.scss";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/AuthProvider";
import profileDefaultImg from "../../assets/img/profileDefault.png";

const MainHeader = ({ openNavHandler }) => {
  const authCtx = useContext(AuthContext);
  const { displayName, profileImgUrl } = authCtx;
  console.log(profileImgUrl);

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
        <Link to="/profile">
          <img
            src={profileImgUrl !== false ? profileImgUrl : profileDefaultImg}
            alt="profileImg"
          />
        </Link>
      </div>
    </header>
  );
};
export default MainHeader;
