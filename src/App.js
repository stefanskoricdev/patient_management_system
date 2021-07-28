import { Route, Switch, Redirect } from "react-router-dom";
import { useContext } from "react";
import Layout from "./components/Layout/Layout";
import styles from "./App.module.scss";
import MainNavigation from "./components/MainNavigation/MainNavigation";
import Backdrop from "./components/UI/Backdrop/Backdrop";
import Home from "./pages/Home/Home";
import Patients from "./pages/Patients/Patients";
import Tasks from "./pages/Tasks/Tasks";
import AppContext from "./store/appContext";
import Individual from "./pages/Patients/Individual/Individual";
import Groups from "./pages/Patients/Groups/Groups";
function App() {
  const appCtx = useContext(AppContext);
  const { isNavBtnClicked } = appCtx;
  return (
    <div className={styles.App}>
      {isNavBtnClicked && <Backdrop />}
      <Layout className={styles.Layout}>
        <MainNavigation navBtnClicked={isNavBtnClicked} />
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/patients" exact>
            <Patients />
          </Route>
          <Route path="/patients/individual">
            <Individual />
          </Route>
          <Route path="/patients/groups">
            <Groups />
          </Route>
          <Route path="/tasks">
            <Tasks />
          </Route>
          <Route path="*">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
