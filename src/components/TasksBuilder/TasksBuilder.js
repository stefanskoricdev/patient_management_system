import styles from "./TasksBuilder.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { sendData, getTasks, updateTask, deleteData } from "../actions/actions";
import uuid from "react-uuid";
import AppContext from "../../store/AppProvider";
import AuthContext from "../../store/AuthProvider";
import crossIcon from "../../assets/img/icon-cross.svg";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const mySwal = withReactContent(Swal);

const COLLECTION = "tasks";

const TaskBuilder = () => {
  const [filter, setFilter] = useState("all");
  const taskInputRef = useRef();

  const appCtx = useContext(AppContext);
  const { setIsLoading, tasks, setTasks } = appCtx;

  const authCtx = useContext(AuthContext);
  const { displayName } = authCtx;

  const createTaskHandler = (e) => {
    e.preventDefault();
    console.log(taskInputRef.current.value);
    if (taskInputRef.current.value.trim() !== "") {
      const newTask = {
        id: uuid(),
        title: taskInputRef.current.value,
        isChecked: false,
        author: displayName,
      };
      sendData(setIsLoading, COLLECTION, newTask);
      setTasks((prevState) => [...prevState, newTask]);
      taskInputRef.current.value = "";
    } else {
      mySwal.fire({
        title: "Please fill input field!",
        icon: "error",
        customClass: { container: "alert-modal" },
      });
    }
  };

  const isCheckedHandler = (e) => {
    const taskId = e.target.getAttribute("data-id");
    updateTask(setIsLoading, COLLECTION, taskId);
    setTasks((prevState) =>
      prevState.map((task) =>
        task.id === taskId ? { ...task, isChecked: !task.isChecked } : task
      )
    );
  };

  const deleteTaskHandler = (e) => {
    const taskId = e.target.getAttribute("data-id");
    deleteData(setIsLoading, setTasks, COLLECTION, taskId);
  };

  const filterChangeHandler = (e) => {
    setFilter(e.target.id);
  };

  const filterView = (filterValue) => {
    let filteredList = null;
    if (filterValue === "active") {
      filteredList = tasks.filter((task) => task.isChecked === false);
    } else if (filterValue === "completed") {
      filteredList = tasks.filter((task) => task.isChecked === true);
    } else {
      filteredList = tasks;
    }
    return filteredList;
  };

  const tasksList = filterView(filter).map((task, i) => {
    return (
      <li key={i}>
        <section className={styles.Task}>
          <p
            className={task.isChecked ? styles.Checked : null}
            data-id={task.id}
            onClick={isCheckedHandler}
          >
            {task.title}
          </p>
          <img
            data-id={task.id}
            onClick={deleteTaskHandler}
            src={crossIcon}
            alt="cross"
          />
        </section>
        <span>{task.author}</span>
      </li>
    );
  });

  useEffect(() => {
    getTasks(setIsLoading, setTasks, COLLECTION);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.TasksBuilder}>
      <form onSubmit={createTaskHandler} className={styles.CreateTask}>
        <input type="text" ref={taskInputRef} />
        <button type="submit">ADD</button>
      </form>
      <ul className={styles.TasksList}>
        {tasksList.length <= 0 && <h2>NO TASKS</h2>}
        {tasksList}
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
export default TaskBuilder;
