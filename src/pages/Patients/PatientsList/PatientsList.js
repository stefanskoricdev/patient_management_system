import styles from "./PatientsList.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import AppContext from "../../../store/AppProvider";
import FilterForm from "../../../components/UI/Forms/FilterForm/FilterForm";
import filterListHandler from "../../../helpers/filterListHandler";

const PatientsList = () => {
  const appCtx = useContext(AppContext);
  const { groupPatients, individualPatients } = appCtx;

  const allPatientsList = groupPatients.concat(individualPatients);

  const [patientsList, setPatientsList] = useState(allPatientsList);

  const firstNameRef = useRef();
  const lastNameRef = useRef();

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
  ];

  useEffect(() => {
    setPatientsList(groupPatients.concat(individualPatients));
  }, [individualPatients, groupPatients]);

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
              [firstNameRef, lastNameRef],
              allPatientsList,
              setPatientsList
            )
          }
          inputs={filterInputs}
        />
      </section>
      <section className={styles.List}>
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
                <th>Email</th>
                <th>Physiotherapist</th>
                {/* <th>Id</th> */}
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
                    <td>{patient.email}</td>
                    <td>{patient.physiotherapist}</td>
                    {/* <td>{patient.id}</td> */}
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
