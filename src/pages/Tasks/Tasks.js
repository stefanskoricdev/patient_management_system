import styles from "./Tasks.module.scss";
import getTime from "../../helpers/getTime";

const Tasks = () => {
  const currentTime = getTime();

  return (
    <section className={styles.Tasks}>
      <header className={styles.Header}>
        <h1>Tasks</h1>
        <p>{currentTime}</p>
      </header>
      <main className={styles.Main}>
        <h1>Some main stuff here!</h1>
      </main>
    </section>
  );
};
export default Tasks;
