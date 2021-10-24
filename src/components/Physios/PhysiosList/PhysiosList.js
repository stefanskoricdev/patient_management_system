import styles from "./PhysiosList.module.scss";
import { useRef, useContext, useState, useEffect } from "react";
import AppContext from "../../../store/AppProvider";
import FilterForm from "../../UI/Forms/FilterForm/FilterForm";
import filterListHandler from "../../../helpers/filterListHandler";
import List from "../../UI/List/List";

const PhysiosList = ({ rootPath }) => {
  const appCtx = useContext(AppContext);
  const { physios } = appCtx;

  const [physiosList, setPhysiosList] = useState(physios);

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

  const tableHeader = ["First name", "Last name", "email", "phone number"];
  const dataKeys = ["firstName", "lastName", "email", "phoneNumber"];

  useEffect(() => {
    setPhysiosList(physios);
  }, [physios]);

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
              physios,
              setPhysiosList
            )
          }
          inputs={filterInputs}
        />
      </section>
      <section className={styles.List}>
        <List
          title="Physios List"
          data={physiosList}
          tableHeader={tableHeader}
          dataKeys={dataKeys}
          rootPath={`${rootPath}/edit-physio/`}
          actions={true}
        />
      </section>
    </section>
  );
};

export default PhysiosList;
