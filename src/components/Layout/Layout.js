import styles from "./Layout.module.scss";
import { useState, useEffect, useCallback } from "react";
import MainHeader from "../MainHeader/MainHeader";
import MainNavigation from "../MainNavigation/MainNavigation";
import Backdrop from "../UI/Backdrop/Backdrop";

const Layout = ({ children }) => {
  const [isNavBtnClicked, setIsNavBtnClicked] = useState(false);
  const openNavHandler = () => {
    setIsNavBtnClicked(true);
  };

  const handleClick = useCallback((e) => {
    if (e.target.getAttribute("data-id") !== "nav-btn") {
      setIsNavBtnClicked(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  return (
    <section className={styles.Layout}>
      {isNavBtnClicked && <Backdrop />}
      <MainHeader openNavHandler={openNavHandler} />
      <MainNavigation isNavBtnClicked={isNavBtnClicked} />
      <main className={styles.Main}>{children}</main>
    </section>
  );
};
export default Layout;
