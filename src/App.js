import { Route, Switch, Redirect } from "react-router-dom";
import { useContext } from "react";
import Layout from "./components/Layout/Layout";
import styles from "./App.module.scss";
import MainNavigation from "./components/MainNavigation/MainNavigation";
import Home from "./pages/Home/Home";
import Patients from "./pages/Patients/Patients";
import Tasks from "./pages/Tasks/Tasks";
import AppContext from "./store/appContext";
import Individual from "./pages/Patients/Individual/Individual";
import Groups from "./pages/Patients/Groups/Groups";
import LayoutProvider from "./store/LayoutProvider";
import Loader from "./components/UI/Loader/Loader";
import Login from "./pages/Login/Login";

function App() {
  const appCtx = useContext(AppContext);
  const { isNavBtnClicked, isLoading } = appCtx;

  const isLoggedIn = true;
  return (
    <div
      style={isLoading ? { height: "100vh", overflowY: "hidden" } : null}
      className={styles.App} // When Loader is open prevents scrollX below Backdrop.
    >
      {!isLoggedIn && (
        <Switch>
          <Route path="/" exact>
            <Redirect to="/login" />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="*" exact>
            <Redirect to="/login" />
          </Route>
        </Switch>
      )}
      {isLoggedIn && (
        <LayoutProvider>
          <Layout isNavBtnClicked={isNavBtnClicked} className={styles.Layout}>
            <MainNavigation navBtnClicked={isNavBtnClicked} />
            {isLoading && <Loader />}
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
        </LayoutProvider>
      )}
    </div>
  );
}

export default App;
