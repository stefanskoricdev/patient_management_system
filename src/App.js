import styles from "./App.module.scss";
import { Route, Switch, Redirect } from "react-router-dom";
import { useContext, lazy, Suspense } from "react";
import Layout from "./components/Layout/Layout";
import Loader from "./components/UI/Loader/Loader";
import Login from "./pages/Login/Login";
import AuthContext from "./store/AuthProvider";

const Home = lazy(() => import("./pages/Home/Home"));
const Patients = lazy(() => import("./pages/Patients/Patients"));
const Notes = lazy(() => import("./pages/Notes/Notes"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Settings = lazy(() => import("./pages/Settings/Settings"));
const About = lazy(() => import("./pages/About/About"));

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
          <Suspense fallback={<Loader />}>
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
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/about">
                <About />
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
          </Suspense>
        </Layout>
      )}
    </div>
  );
}

export default App;
