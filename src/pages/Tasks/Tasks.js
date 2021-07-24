import styles from "./Tasks.module.scss";

const Tasks = () => {
  return (
    <section className={styles.Tasks}>
      <header className={styles.Header}>
        <h1>Tasks</h1>
        <p>24.07.2021</p>
      </header>
      <main className={styles.Main}>
        <h1>Some main stuff here!</h1>
      </main>
    </section>
  );
};
export default Tasks;
