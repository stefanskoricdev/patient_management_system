import styles from "./UsersList.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../../store/AuthProvider";
import filterListHandler from "../../../helpers/filterListHandler";

const UsersList = () => {
  const authCtx = useContext(AuthContext);
  const { users } = authCtx;

  const [usersList, setUsersList] = useState(users);

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const idRef = useRef();

  useEffect(() => {
    setUsersList(users);
  }, [users]);

  return (
    <section className={styles.Wrapper}>
      <section className={styles.Filters}>
        <header>
          <i className="fas fa-filter"></i>
          <h3>Filters</h3>
        </header>
        <form
          onSubmit={(e) =>
            filterListHandler(
              e,
              [firstNameRef, lastNameRef, emailRef, idRef],
              users,
              setUsersList
            )
          }
        >
          <label>
            First Name
            <input name="firstName" type="text" ref={firstNameRef}></input>
          </label>
          <label>
            Last Name
            <input name="lastName" type="text" ref={lastNameRef}></input>
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
      <section className={styles.List}>
        <header>
          <i className="fas fa-list-ul"></i>
          <h3>Users List</h3>
        </header>
        {usersList.length < 1 && <p>No users available</p>}
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
