import styles from "./MainHeader.module.scss";
const MainHeader = (props) => {
  return (
    <header className={styles.MainHeader}>
      <button
        data-id="nav-btn"
        onClick={props.navBtnClick}
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
