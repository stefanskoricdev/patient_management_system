import { Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "./components/Layout/Layout";
import styles from "./App.module.scss";
import MainNavigation from "./components/MainNavigation/MainNavigation";
import Backdrop from "./components/UI/Backdrop/Backdrop";
import Home from "./pages/Home/Home";
import Patients from "./pages/Patients/Patients";
import Tasks from "./pages/Tasks/Tasks";
function App() {
  const [isNavBtnClicked, setIsNavBtnClicked] = useState(false);

  const navBtnClickHandler = () => {
    setIsNavBtnClicked(true);
  };

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target.getAttribute("data-id") !== "nav-btn") {
        setIsNavBtnClicked(false);
      }
    });
  }, []);
  return (
    <div className={styles.App}>
      {isNavBtnClicked && <Backdrop />}
      <Layout navBtnClick={navBtnClickHandler} className={styles.Layout}>
        <MainNavigation navBtnClicked={isNavBtnClicked} />
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/patients">
            <Patients />
          </Route>
          <Route path="/tasks">
            <Tasks />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
