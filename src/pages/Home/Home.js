import styles from "./Home.module.scss";

const Home = () => {
  return (
    <section className={styles.Home}>
      <header className={styles.Header}>
        <h1>Home</h1>
        <p>24.07.2021</p>
      </header>
      <main className={styles.Main}>
        <h1>Some main stuff here!</h1>
      </main>
    </section>
  );
};
export default Home;
