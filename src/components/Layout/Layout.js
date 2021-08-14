import { Fragment } from "react";
import MainHeader from "../MainHeader/MainHeader";
import Backdrop from "../UI/Backdrop/Backdrop";

const Layout = ({ isNavBtnClicked, children }) => {
  return (
    <Fragment>
      {isNavBtnClicked && <Backdrop />}
      <MainHeader />
      <main>{children}</main>
    </Fragment>
  );
};
export default Layout;
