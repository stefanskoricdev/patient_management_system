import styles from "./Physios.module.scss";
import {
  NavLink,
  Route,
  Switch,
  Redirect,
  useRouteMatch,
} from "react-router-dom";
import PhysiosList from "./PhysiosList/PhysiosList";
import AddEditPhysio from "./AddEditPhysio/AddEditPhysio";
import AddEditGroupPhysio from "./AddEditGroupPhysio/AddEditGroupPhysio";

const workingDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const workingHours = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

const Physios = () => {
  const { path } = useRouteMatch();
  console.log(path);
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
        <NavLink
          activeClassName={styles.active}
          to={`${path}/add-group-physio`}
        >
          Add group physio
          <i className="fas fa-caret-up"></i>
        </NavLink>
      </nav>
      <main>
        <Switch>
          <Route path={path} exact>
            <Redirect to={`${path}/physios-list`} />
          </Route>
          <Route path={`${path}/physios-list`}>
            <PhysiosList rootPath={path} />
          </Route>
          <Route path={`${path}/add-physio`}>
            <AddEditPhysio
              workingDays={workingDays}
              workingHours={workingHours}
              rootPath={path}
            />
          </Route>
          <Route path={`${path}/edit-physio/:id`}>
            <AddEditPhysio
              workingDays={workingDays}
              workingHours={workingHours}
              rootPath={path}
            />
          </Route>
          <Route path={`${path}/add-group-physio`}>
            <AddEditGroupPhysio workingHours={workingHours} rootPath={path} />
          </Route>
          <Route path={`${path}/edit-group-physio/:id`}>
            <AddEditGroupPhysio workingHours={workingHours} rootPath={path} />
          </Route>
          <Route path="*">
            <Redirect to={`${path}/physios-list`} />
          </Route>
        </Switch>
      </main>
    </section>
  );
};

export default Physios;
