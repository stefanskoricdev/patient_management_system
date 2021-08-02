import { Fragment } from "react";
import MainHeader from "../MainHeader/MainHeader";
import Backdrop from "../UI/Backdrop/Backdrop";

const Layout = (props) => {
  const { isNavBtnClicked } = props;

  return (
    <Fragment>
      {isNavBtnClicked && <Backdrop />}
      <MainHeader />
      <main>{props.children}</main>
    </Fragment>
  );
};
export default Layout;
