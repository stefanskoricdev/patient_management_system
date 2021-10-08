import styles from "./Notes.module.scss";
import { useContext } from "react";
import NotesBuilder from "../../components/NotesBuilder/NotesBuilder";
import AppContext from "../../store/AppProvider";

const Notes = () => {
  const appCtx = useContext(AppContext);
  const { currentDate } = appCtx;

  return (
    <section className={styles.Notes}>
      <header className={styles.Header}>
        <h1>Notes</h1>
        <p>{currentDate}</p>
      </header>
      <main className={styles.Main}>
        <NotesBuilder currentDate={currentDate} />
      </main>
    </section>
  );
};
export default Notes;
