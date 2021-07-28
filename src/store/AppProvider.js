import { React, useState, useEffect } from "react";
import AppContext from "./appContext";

const AppProvider = (props) => {
  const [isNavBtnClicked, setIsNavBtnClicked] = useState(false);

  const openNavHandler = () => {
    setIsNavBtnClicked(true);
  };

  const closeNavHandler = (e) => {
    if (e.target.getAttribute("data-id") !== "nav-btn") {
      setIsNavBtnClicked(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target.getAttribute("data-id") !== "nav-btn") {
        setIsNavBtnClicked(false);
      }
    });
  }, []);

  const appContextValue = {
    isNavBtnClicked,
    openNavHandler,
    closeNavHandler,
  };
  return (
    <AppContext.Provider value={appContextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
