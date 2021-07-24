import { Fragment } from "react";
import MainHeader from "../MainHeader/MainHeader";
import styles from "./Layout.module.scss";
const Layout = (props) => {
  return (
    <Fragment>
      <MainHeader navBtnClick={props.navBtnClick} />
      <main>{props.children}</main>
    </Fragment>
  );
};
export default Layout;
