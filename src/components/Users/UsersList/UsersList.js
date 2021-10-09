import styles from "./UsersList.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../../store/AuthProvider";
import filterListHandler from "../../../helpers/filterListHandler";
import FilterForm from "../../UI/Forms/FilterForm/FilterForm";

const UsersList = () => {
  const authCtx = useContext(AuthContext);
  const { users } = authCtx;

  const [usersList, setUsersList] = useState(users);

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const idRef = useRef();

  const filterInputs = [
    {
      label: "First Name",
      name: "firstName",
      type: "text",
      inputRef: firstNameRef,
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
      inputRef: lastNameRef,
    },
    {
      label: "Email",
      name: "email",
      type: "text",
      inputRef: emailRef,
    },
    {
      label: "Id",
      name: "id",
      type: "text",
      inputRef: idRef,
    },
  ];

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
        <FilterForm
          submit={(e) =>
            filterListHandler(
              e,
              [firstNameRef, lastNameRef, emailRef, idRef],
              users,
              setUsersList
            )
          }
          inputs={filterInputs}
        />
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
