import styles from "./Settings.module.scss";
import getTime from "../../helpers/getTime";

const Settings = () => {
  const currentTime = getTime();

  return (
    <section className={styles.Settings}>
      <header className={styles.Header}>
        <h1>Settings</h1>
        <p>{currentTime}</p>
      </header>
      <main className={styles.Main}>Main stuff</main>
    </section>
  );
};
export default Settings;
