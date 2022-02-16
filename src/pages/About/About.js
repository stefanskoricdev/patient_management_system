import styles from "./About.module.scss";
import { useContext } from "react";
import AppContext from "../../store/AppProvider";
import AboutCard from "./AboutCard/AboutCard";

const About = () => {
  const appCtx = useContext(AppContext);
  const { currentDate } = appCtx;

  return (
    <section className={styles.About}>
      <header className={styles.Header}>
        <h1>About</h1>
        <p>{currentDate}</p>
      </header>
      <main>
        <AboutCard />
      </main>
    </section>
  );
};

export default About;
