import styles from "./Home.module.scss";
import getTime from "../../helpers/getTime";
import GenderChart from "../../components/UI/ChartJs/GenderChart/GenderChart";
import { useContext } from "react";
import CountUp from "react-countup";
import appContext from "../../store/appContext";

const Home = () => {
  const currentTime = getTime();
  const appCtx = useContext(appContext);

  const { patients, isLoading } = appCtx;

  const patientsCount = patients.length;
  const malePatientsCount = patients.filter(
    (patient) => patient.gender === "male"
  ).length;
  const femalePatientsCount = patients.filter(
    (patient) => patient.gender === "female"
  ).length;

  return (
    <section className={styles.Home}>
      <header className={styles.Header}>
        <h1>Home</h1>
        <p>{currentTime}</p>
      </header>
      <main className={styles.Main}>
        <section className={styles.CurrentPatients}>
          <h1>Current Patients</h1>
          <p>
            {isLoading && 0}
            <CountUp duration={0.5} end={patientsCount} />
          </p>
        </section>
        <GenderChart
          maleCount={malePatientsCount}
          femaleCount={femalePatientsCount}
          isLoading={isLoading}
        />
      </main>
    </section>
  );
};
export default Home;
