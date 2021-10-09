import styles from "./PhysiosList.module.scss";
import { useRef, useContext, useState, useEffect } from "react";
import AppContext from "../../../store/AppProvider";
import FilterForm from "../../UI/Forms/FilterForm/FilterForm";
import filterListHandler from "../../../helpers/filterListHandler";

const PhysiosList = () => {
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
        {physiosList.length < 1 && <p>No physios available</p>}
        {physiosList.length > 0 && (
          <table>
            <tbody>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
              </tr>
              {physiosList.map((patient) => {
                return (
                  <tr key={patient.id}>
                    <td>{patient.firstName}</td>
                    <td>{patient.lastName}</td>
                    <td>{patient.email}</td>
                    <td>{patient.phoneNumber}</td>
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

export default PhysiosList;
