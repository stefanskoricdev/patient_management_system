import styles from "./Home.module.scss";
import getTime from "../../helpers/getTime";
import GenderChart from "../../components/UI/ChartJs/GenderChart/GenderChart";
import { useContext } from "react";
import CountUp from "react-countup";
import AppContext from "../../store/AppProvider";
import AverageAge from "../../components/UI/ChartJs/AverageAge/AverageAge";

const Home = () => {
  const currentTime = getTime();

  const appCtx = useContext(AppContext);
  const { individualPatients, groupPatients, isLoading, tasks } = appCtx;

  const allPatients = individualPatients.concat(groupPatients);
  const patientsCount = allPatients.length;
  const malePatientsCount = allPatients.filter(
    (patient) => patient.gender === "male"
  ).length;
  const femalePatientsCount = allPatients.filter(
    (patient) => patient.gender === "female"
  ).length;

  const tasksList = tasks.map((task, i) => {
    return (
      <li className={task.isChecked ? styles.Checked : null} key={i}>
        <p>{task.title}</p>
        <span>{task.author}</span>
      </li>
    );
  });

  const tableContent = allPatients.map((patient, i) => {
    const tableContentEl = (
      <tr key={i}>
        <td>{patient.firstName}</td>
        <td>{patient.lastName}</td>
        <td>{patient.dateOfBirth}</td>
        <td>{patient.physiotherapist}</td>
      </tr>
    );
    return tableContentEl;
  });

  return (
    <section className={styles.Home}>
      <header className={styles.Header}>
        <h1>Home</h1>
        <p>{currentTime}</p>
      </header>
      <main className={styles.Main}>
        <section className={styles.Stats}>
          <div className={styles.CurrentPatients}>
            <h1>Current Patients</h1>
            <p>
              {isLoading && 0}
              <CountUp duration={0.5} end={patientsCount} />
            </p>
          </div>
          <GenderChart
            maleCount={malePatientsCount}
            femaleCount={femalePatientsCount}
            isLoading={isLoading}
          />
        </section>
        <section className={styles.PatientsListWrapper}>
          <table className={styles.PatientsListTable}>
            <caption>
              <h1>Patients List</h1>
            </caption>
            <tbody>
              <tr className={styles.BodyHeader}>
                <th>First Name</th>
                <th>Last Name</th>
                <th>DOB</th>
                <th>Physiotherapist</th>
              </tr>
              {tableContent}
            </tbody>
          </table>
          <section className={styles.TasksList}>
            <ul>
              <h1>Tasks</h1>
              {tasks.length <= 0 && <h2>NO NEW TASKS</h2>} {tasksList}
            </ul>
          </section>
          <AverageAge isLoading={isLoading} patients={allPatients} />
        </section>
      </main>
    </section>
  );
};
export default Home;
