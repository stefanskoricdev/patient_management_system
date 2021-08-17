import styles from "./Tasks.module.scss";
import getTime from "../../helpers/getTime";
import TaskBuilder from "../../components/TasksBuilder/TasksBuilder";

const Tasks = () => {
  const currentTime = getTime();

  return (
    <section className={styles.Tasks}>
      <header className={styles.Header}>
        <h1>Tasks</h1>
        <p>{currentTime}</p>
      </header>
      <main className={styles.Main}>
        <TaskBuilder />
      </main>
    </section>
  );
};
export default Tasks;
