import { Fragment } from "react";
import MainHeader from "../MainHeader/MainHeader";
import Backdrop from "../UI/Backdrop/Backdrop";
import styles from "./Layout.module.scss";

const Layout = (props) => {
  const { isNavBtnClicked } = props;

  return (
    <Fragment>
      {isNavBtnClicked && <Backdrop />}
      <MainHeader />
      <main className={styles.Main}>{props.children}</main>
    </Fragment>
  );
};
export default Layout;
