import styles from "./Patients.module.scss";

const Patients = () => {
  return (
    <section className={styles.Patients}>
      <header className={styles.Header}>
        <h1>Patients</h1>
        <p>24.07.2021</p>
      </header>
      <main className={styles.Main}>
        <h1>Some main stuff here!</h1>
      </main>
    </section>
  );
};
export default Patients;
