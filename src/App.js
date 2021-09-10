import styles from "./App.module.scss";
import { Route, Switch, Redirect } from "react-router-dom";
import { useContext } from "react";
import { LayoutProvider } from "./store/LayoutProvider";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Patients from "./pages/Patients/Patients";
import Notes from "./pages/Notes/Notes";
import AppContext from "./store/AppProvider";
import Individual from "./pages/Patients/Individual/Individual";
import Groups from "./pages/Patients/Groups/Groups";
import Loader from "./components/UI/Loader/Loader";
import Login from "./pages/Login/Login";
import AuthContext from "./store/AuthProvider";
import Settings from "./pages/Settings/Settings";

function App() {
  const authCtx = useContext(AuthContext);
  const { isLoggedIn, isAdmin } = authCtx;

  const appCtx = useContext(AppContext);
  const { isLoading } = appCtx;

  return (
    <div
      style={isLoading ? { height: "100vh", overflowY: "hidden" } : null}
      // When Loader is open prevents scrollX below Backdrop.
      className={styles.App}
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
          <Layout className={styles.Layout}>
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
              <Route path="/notes">
                <Notes />
              </Route>
              {isAdmin && (
                <Route path="/admin">
                  <Settings />
                </Route>
              )}
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
