import styles from "./App.module.scss";
import { Route, Switch, Redirect } from "react-router-dom";
import { useContext } from "react";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Patients from "./pages/Patients/Patients";
import Notes from "./pages/Notes/Notes";
import Loader from "./components/UI/Loader/Loader";
import Login from "./pages/Login/Login";
import AuthContext from "./store/AuthProvider";
import Settings from "./pages/Settings/Settings";

function App() {
  const authCtx = useContext(AuthContext);
  const { isLoggedIn, isAdmin, isLoading } = authCtx;

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
        <Layout className={styles.Layout}>
          {isLoading && <Loader />}
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/patients">
              <Patients />
            </Route>
            <Route path="/notes">
              <Notes />
            </Route>
            {isAdmin && (
              <Route path="/settings">
                <Settings />
              </Route>
            )}
            <Route path="*">
              <Redirect to="/home" />
            </Route>
          </Switch>
        </Layout>
      )}
    </div>
  );
}

export default App;
