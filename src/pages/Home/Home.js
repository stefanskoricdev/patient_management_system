import styles from "./Home.module.scss";
import { useContext } from "react";
import GenderChart from "../../components/UI/ChartJs/GenderChart/GenderChart";
import CountUp from "react-countup";
import AppContext from "../../store/AppProvider";
import TypeChart from "../../components/UI/ChartJs/TypeChart/TypeChart";

const Home = () => {
  const appCtx = useContext(AppContext);
  const { individualPatients, groupPatients, isLoading, notes, currentDate } =
    appCtx;

  const allPatients = individualPatients.concat(groupPatients);
  const patientsCount = allPatients.length;
  const malePatientsCount = allPatients.filter(
    (patient) => patient.gender === "male"
  ).length;
  const femalePatientsCount = allPatients.filter(
    (patient) => patient.gender === "female"
  ).length;

  const notesList = notes.map((note, i) => {
    return (
      <li className={note.isChecked ? styles.Checked : null} key={note.id}>
        <p>{note.title}</p>
        <footer>
          <span>{note.date}</span>
          <span>{note.author}</span>
        </footer>
      </li>
    );
  });

  const tableContent = allPatients.map((patient) => {
    const tableContentEl = (
      <tr key={patient.id}>
        <td>{patient.firstName}</td>
        <td>{patient.lastName}</td>
        <td>{patient.dateOfBirth}</td>
        <td>{patient.phone}</td>
        <td>{patient.email}</td>
        <td>{`${patient.physiotherapist.firstName} ${patient.physiotherapist.lastName}`}</td>
      </tr>
    );
    return tableContentEl;
  });

  return (
    <section className={styles.Home}>
      <header className={styles.Header}>
        <h1>Home</h1>
        <p>{currentDate}</p>
      </header>
      <main className={styles.Main}>
        <section className={styles.LeftSideWrapper}>
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
        <section className={styles.RightSideWrapper}>
          <table className={styles.PatientsListTable}>
            <caption>
              <h1>Patients List</h1>
            </caption>
            <tbody>
              <tr className={styles.BodyHeader}>
                <th>First Name</th>
                <th>Last Name</th>
                <th>DOB</th>
                <th>Phone number</th>
                <th>Email</th>
                <th>Physiotherapist</th>
              </tr>
              {tableContent}
            </tbody>
          </table>
          <section className={styles.NotesList}>
            <h1>Notes</h1>
            <ul>
              {notes.length <= 0 && <h2>NO NEW NOTES</h2>} {notesList}
            </ul>
          </section>
          <TypeChart
            isLoading={isLoading}
            individual={individualPatients}
            group={groupPatients}
          />
        </section>
      </main>
    </section>
  );
};
export default Home;
