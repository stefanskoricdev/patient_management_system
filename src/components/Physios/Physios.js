import styles from "./Physios.module.scss";
import {
  NavLink,
  Route,
  Switch,
  Redirect,
  useRouteMatch,
} from "react-router-dom";
import PhysiosList from "./PhysiosList/PhysiosList";
import AddPhysioModal from "../UI/AddPhysioModal/AddPhysioModal";

const Physios = () => {
  const { path, url } = useRouteMatch();
  return (
    <section className={styles.Physios}>
      <nav className={styles.Nav}>
        <NavLink activeClassName={styles.active} to={`${path}/physios-list`}>
          Physios list
          <i className="fas fa-caret-up"></i>
        </NavLink>
        <NavLink activeClassName={styles.active} to={`${path}/add-physio`}>
          Add physio
          <i className="fas fa-caret-up"></i>
        </NavLink>
      </nav>
      <main>
        <Switch>
          <Route path={url} exact>
            <Redirect to={`${path}/physios-list`} />
          </Route>
          <Route path={`${path}/physios-list`}>
            <PhysiosList />
          </Route>
          <Route path={`${path}/add-physio`}>
            <AddPhysioModal />
          </Route>
        </Switch>
      </main>
    </section>
  );
};

export default Physios;
