import styles from "./NotesBuilder.module.scss";
import { useContext, useRef, useState } from "react";
import { sendData, updateData, deleteData } from "../actions/actions";
import { useHistory, useRouteMatch } from "react-router-dom";
import uuid from "react-uuid";
import AppContext from "../../store/AppProvider";
import AuthContext from "../../store/AuthProvider";
import crossIcon from "../../assets/img/icon-cross.svg";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import firebase from "firebase/app";

const mySwal = withReactContent(Swal);

const NotesBuilder = ({ currentDate }) => {
  const [filter, setFilter] = useState("all");
  const noteInputRef = useRef();

  const appCtx = useContext(AppContext);
  const { setIsLoading, notes, setNotes, notesCollection } = appCtx;

  const authCtx = useContext(AuthContext);
  const { displayName } = authCtx;

  const history = useHistory();
  const { path } = useRouteMatch();

  const createNoteHandler = (e) => {
    e.preventDefault();
    if (noteInputRef.current.value.trim() !== "") {
      const newNote = {
        id: uuid(),
        title: noteInputRef.current.value,
        isChecked: false,
        author: displayName,
        date: currentDate,
        dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
      };
      sendData(setIsLoading, notesCollection, newNote, setNotes);
      noteInputRef.current.value = "";
    } else {
      mySwal.fire({
        title: "Please fill input field!",
        icon: "error",
        customClass: { container: "alert-modal" },
      });
    }
  };

  const isCheckedHandler = (e) => {
    const noteId = e.target.getAttribute("data-id");
    const targetedNoteIndex = notes.findIndex((note) => note.id === noteId);
    const updatedNotesList = [...notes];
    const targetedNoteCheckStatus =
      updatedNotesList[targetedNoteIndex].isChecked;
    updatedNotesList[targetedNoteIndex].isChecked = !targetedNoteCheckStatus;
    updateData(
      setIsLoading,
      notesCollection,
      noteId,
      {
        isChecked: !targetedNoteCheckStatus,
      },
      setNotes,
      updatedNotesList
    );
  };

  const deleteNoteHandler = (e) => {
    const noteId = e.target.getAttribute("data-id");
    deleteData(setIsLoading, setNotes, notesCollection, noteId, history, path);
  };

  const filterChangeHandler = (e) => {
    setFilter(e.target.id);
  };

  const filterView = (filterValue) => {
    let filteredList = null;
    if (filterValue === "active") {
      filteredList = notes.filter((note) => note.isChecked === false);
    } else if (filterValue === "completed") {
      filteredList = notes.filter((note) => note.isChecked === true);
    } else {
      filteredList = notes;
    }
    return filteredList;
  };

  const notesList = filterView(filter).map((note, i) => {
    return (
      <li key={note.id}>
        <main className={styles.Note}>
          <p
            className={note.isChecked ? styles.Checked : null}
            data-id={note.id}
            onClick={isCheckedHandler}
          >
            {note.title}
          </p>
          <img
            data-id={note.id}
            onClick={deleteNoteHandler}
            src={crossIcon}
            alt="cross"
          />
        </main>
        <footer>
          <span>{note.date}</span>
          <span>{note.author}</span>
        </footer>
      </li>
    );
  });

  return (
    <section className={styles.NotesBuilder}>
      <form onSubmit={createNoteHandler} className={styles.CreateNote}>
        <input type="text" placeholder="Add note" ref={noteInputRef} />
        <button type="submit">ADD</button>
      </form>
      <ul className={styles.NotesList}>
        {notesList.length <= 0 && <h2>NO NOTES</h2>}
        {notesList}
      </ul>
      <footer>
        <p id="all" onClick={filterChangeHandler}>
          All<span>{`(${filterView("all").length})`}</span>
        </p>
        <p id="active" onClick={filterChangeHandler}>
          Active<span>{`(${filterView("active").length})`}</span>
        </p>
        <p id="completed" onClick={filterChangeHandler}>
          Completed<span>{`(${filterView("completed").length})`}</span>
        </p>
      </footer>
    </section>
  );
};
export default NotesBuilder;
