import styles from "./UsersList.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../../store/AuthProvider";
import filterListHandler from "../../../helpers/filterListHandler";
import FilterForm from "../../UI/Forms/FilterForm/FilterForm";
import List from "../../UI/List/List";

const UsersList = ({ rootPath }) => {
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

  const tableHeader = ["First Name", "Last Name", "Email", "Id"];
  const dataKeys = ["firstName", "lastName", "email", "id"];

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
        <List
          title="Users List"
          data={usersList}
          tableHeader={tableHeader}
          dataKeys={dataKeys}
          path={rootPath}
        ></List>
      </section>
    </section>
  );
};

export default UsersList;
