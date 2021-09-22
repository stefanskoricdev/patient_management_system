import styles from "./PhysiosList.module.scss";
import { useRef, useContext } from "react";
import AppContext from "../../../store/AppProvider";

const PhysiosList = () => {
  const appCtx = useContext(AppContext);
  const { physios } = appCtx;

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const idRef = useRef();

  const filterListHandler = () => {};
  return (
    <section className={styles.PhysiosWrapper}>
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
      <section className={styles.PhysiosList}>
        {physios.length < 0 && <p>No physios available</p>}
        {physios.length > 0 && (
          <table>
            <tbody>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
              </tr>
              {physios.map((patient) => {
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
