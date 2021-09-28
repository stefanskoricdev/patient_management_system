import styles from "./UsersList.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import AppContext from "../../../store/AppProvider";

const UsersList = () => {
  const appCtx = useContext(AppContext);
  const { users } = appCtx;

  const [usersList, setUsersList] = useState(users);

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const idRef = useRef();

  const filterListHandler = (e) => {
    e.preventDefault();

    let filterValue = {};

    const firstName = firstNameRef.current.value.trim();
    const lastName = lastNameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const id = idRef.current.value.trim();

    if (firstName) {
      filterValue["firstName"] = firstName;
    }
    if (lastName) {
      filterValue["lastName"] = lastName;
    }
    if (email) {
      filterValue["email"] = email;
    }
    if (id) {
      filterValue["id"] = id;
    }
    let filteredList = users.filter((user) => {
      for (let key in filterValue) {
        if (
          user[key] === undefined ||
          user[key].toLowerCase() !== filterValue[key].toLowerCase()
        )
          return false;
      }
      return user;
    });
    setUsersList(filteredList);
  };

  useEffect(() => {
    setUsersList(users);
  }, [users]);

  return (
    <section className={styles.UsersWrapper}>
      <section className={styles.Filters}>
        <header>
          <i className="fas fa-filter"></i>
          <h3>Filters</h3>
        </header>
        <form onSubmit={filterListHandler}>
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
            <i className="fas fa-filter"></i> Filter
          </button>
        </form>
      </section>
      <section className={styles.UsersList}>
        <header>
          <i className="fas fa-list-ul"></i>
          <h3>Users List</h3>
        </header>
        {usersList.length < 1 && <h2>No users available</h2>}
        {usersList.length > 0 && (
          <table>
            <tbody>
              <tr className={styles.BodyHeader}>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Id</th>
              </tr>
              {usersList.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.id}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>
    </section>
  );
};

export default UsersList;
