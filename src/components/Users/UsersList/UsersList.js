import styles from "./UsersList.module.scss";
import { Fragment, useContext, useRef } from "react";
import AppContext from "../../../store/AppProvider";

const UsersList = () => {
  const appCtx = useContext(AppContext);
  const { users } = appCtx;

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const idRef = useRef();

  const usersList = users.map((user) => {
    return (
      <tr key={user.id}>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td>{user.id}</td>
      </tr>
    );
  });

  return (
    <section className={styles.UsersWrapper}>
      <section className={styles.Filters}>
        <header>
          <i class="fas fa-filter"></i>
          <h3>Filters</h3>
        </header>
        <form>
          <label>
            First Name
            <input name="first-name" type="text" ref={firstNameRef}></input>
          </label>
          <label>
            Last Name
            <input name="last-name" type="text" ref={lastNameRef}></input>
          </label>
          <label>
            Email
            <input name="email" type="text" ref={emailRef}></input>
          </label>
          <label>
            Id
            <input name="id" type="text" ref={idRef}></input>
          </label>
          <button>
            <i class="fas fa-filter"></i> Filter
          </button>
        </form>
      </section>
      <section className={styles.UsersList}>
        <header>
          <i class="fas fa-list-ul"></i>
          <h3>Users List</h3>
        </header>
        <table>
          <tbody>
            <tr className={styles.BodyHeader}>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Id</th>
            </tr>
            {usersList}
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default UsersList;
