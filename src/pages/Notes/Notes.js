import styles from "./Notes.module.scss";
import getTime from "../../helpers/getTime";
import NotesBuilder from "../../components/NotesBuilder/NotesBuilder";

const Notes = () => {
  const currentTime = getTime();

  return (
    <section className={styles.Notes}>
      <header className={styles.Header}>
        <h1>Notes</h1>
        <p>{currentTime}</p>
      </header>
      <main className={styles.Main}>
        <NotesBuilder currentTime={currentTime} />
      </main>
    </section>
  );
};
export default Notes;
