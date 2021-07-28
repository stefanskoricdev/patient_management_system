import styles from "./Home.module.scss";
import getTime from "../../helpers/getTime";

const Home = () => {
  const currentTime = getTime();
  return (
    <section className={styles.Home}>
      <header className={styles.Header}>
        <h1>Home</h1>
        <p>{currentTime}</p>
      </header>
      <main className={styles.Main}>
        <h1>Some main stuff here!</h1>
      </main>
    </section>
  );
};
export default Home;
