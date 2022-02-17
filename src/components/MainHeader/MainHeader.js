import styles from "./MainHeader.module.scss";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/AuthProvider";
import profileDefaultImg from "../../assets/img/profileDefault.png";
import Popover from "../UI/Popover/Popover";

const MainHeader = ({ openNavHandler }) => {
  const authCtx = useContext(AuthContext);
  const { displayName, profileImgUrl, logout } = authCtx;

  const [popoverShow, setPopoverShow] = useState(false);

  const togglePopover = () => {
    setPopoverShow((prevState) => !prevState);
  };

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
      <div onClick={togglePopover} className={styles.UserAvatar}>
        <p>{displayName}</p>
        <img
          src={profileImgUrl !== "" ? profileImgUrl : profileDefaultImg}
          alt="profileImg"
        />
        <Popover setIsVisible={setPopoverShow} isVisible={popoverShow}>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li onClick={logout}>Logout</li>
        </Popover>
      </div>
    </header>
  );
};
export default MainHeader;
