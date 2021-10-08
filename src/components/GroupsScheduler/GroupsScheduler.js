import styles from "./GroupsScheduler.module.scss";
import { useContext } from "react";
import Loader from "../UI/Loader/Loader";
import AppContext from "../../store/AppProvider";

const GroupsScheduler = ({ physiotherapist, config }) => {
  const appCtx = useContext(AppContext);
  const { isLoading } = appCtx;

  const workingDays = config[0].workingDays.map((day, i) => (
    <li key={i}>{day}</li>
  ));
  const workingHours = config[0].workingHours.map((hour, i) => (
    <li key={i}>{hour}</li>
  ));

  return (
    <section className={styles.SchedulerWrapper}>
      {isLoading && <Loader />}
      <header className={styles.Header}>{workingDays}</header>
      <main className={styles.Main}>
        <div className={styles.Time}>
          <ul>{workingHours}</ul>
        </div>
        <section
          id="schedule"
          className={styles.Schedule}
          style={{
            gridTemplateColumns: `repeat(${workingDays.length}, 20% [col-start])`,
            gridTemplateRows: `repeat(${workingHours.length}, 20rem [row-start])`,
          }}
        ></section>
      </main>
    </section>
  );
};
export default GroupsScheduler;
