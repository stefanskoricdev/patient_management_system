import styles from "./PhysiosList.module.scss";
import { useRef, useContext, useState, useEffect } from "react";
import AppContext from "../../../store/AppProvider";
import filterListHandler from "../../../helpers/filterListHandler";

const PhysiosList = () => {
  const appCtx = useContext(AppContext);
  const { physios } = appCtx;

  const [physiosList, setPhysiosList] = useState(physios);

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const idRef = useRef();

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
        <form
          onSubmit={(e) => {
            filterListHandler(
              e,
              [firstNameRef, lastNameRef, emailRef, idRef],
              physios,
              setPhysiosList
            );
          }}
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
