import styles from "./PatientsList.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import AppContext from "../../../store/AppProvider";
import resetFilterInputs from "../../../helpers/resetFilterInputs";

const PatientsList = () => {
  const appCtx = useContext(AppContext);
  const { groupPatients, individualPatients } = appCtx;

  const allPatientsList = groupPatients.concat(individualPatients);

  const [patientsList, setPatientsList] = useState(allPatientsList);

  const firstNameRef = useRef();
  const lastNameRef = useRef();

  const filterListHandler = (e) => {
    e.preventDefault();
    let filterValue = {};
    const firstName = firstNameRef.current.value.trim();
    const lastName = lastNameRef.current.value.trim();
    if (firstName) {
      filterValue["firstName"] = firstName;
    }
    if (lastName) {
      filterValue["lastName"] = lastName;
    }

    let filteredList = allPatientsList.filter((user) => {
      for (let key in filterValue) {
        if (
          user[key] === undefined ||
          user[key].toLowerCase() !== filterValue[key].toLowerCase()
        )
          return false;
      }
      return user;
    });
    resetFilterInputs([firstNameRef, lastNameRef]);
    setPatientsList(filteredList);
  };

  useEffect(() => {
    setPatientsList(groupPatients.concat(individualPatients));
  }, [individualPatients, groupPatients]);

  return (
    <section className={styles.PatientsListWrapper}>
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
          <button>
            <i className="fas fa-filter"></i> Filter
          </button>
        </form>
      </section>
      <section className={styles.PatientsList}>
        <header>
          <i className="fas fa-list-ul"></i>
          <h3>Patients List</h3>
        </header>
        {patientsList.length < 1 && <p>No patients available</p>}
        {patientsList.length > 0 && (
          <table>
            <tbody>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Date of Birth</th>
                <th>Gender</th>
                <th>City</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Physiotherapist</th>
                <th>Id</th>
              </tr>
              {patientsList.map((patient) => {
                return (
                  <tr key={patient.id}>
                    <td>{patient.firstName}</td>
                    <td>{patient.lastName}</td>
                    <td>{patient.dateOfBirth}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.city}</td>
                    <td>{patient.address}</td>
                    <td>{patient.phone}</td>
                    <td>{patient.physiotherapist}</td>
                    <td>{patient.id}</td>
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

export default PatientsList;
