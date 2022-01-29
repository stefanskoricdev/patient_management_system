import styles from "./PatientsList.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteData } from "../../../components/actions/actions";
import AppContext from "../../../store/AppProvider";
import FilterForm from "../../../components/UI/Forms/FilterForm/FilterForm";
import filterListHandler from "../../../helpers/filterListHandler";

const PatientsList = ({ rootPath }) => {
  const appCtx = useContext(AppContext);
  const {
    groupPatients,
    individualPatients,
    setIsLoading,
    setIndividualPatients,
    setGroupPatients,
    groupsCollection,
    individualCollection,
  } = appCtx;

  const history = useHistory();

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

  const patientsListTableEl = patientsList.map((patient) => {
    return (
      <tr key={patient.id}>
        <td>
          <button
            onClick={() => {
              deleteData(
                setIsLoading,
                patient.type === "individual"
                  ? setIndividualPatients
                  : setGroupPatients,
                patient.type === "individual"
                  ? individualCollection
                  : groupsCollection,
                patient.id,
                history,
                rootPath
              );
            }}
          >
            <i className="fas fa-user-times"></i>
          </button>
          <Link
            to={`${rootPath}/${patient.type}-patients/${
              patient.physiotherapist.firstName
            }${patient.physiotherapist.lastName}/edit-patient/${patient.id}${
              patient.type === "individual" ? "index=0" : ""
            }`}
          >
            <i className="fas fa-user-edit"></i>
          </Link>
        </td>
        <td>{patient.firstName}</td>
        <td>{patient.lastName}</td>
        <td>{patient.dateOfBirth}</td>
        <td>{patient.gender}</td>
        <td>{patient.city}</td>
        <td>{patient.address}</td>
        <td>{patient.phone}</td>
        <td>{patient.email}</td>
        <td>{`${patient.physiotherapist.firstName} ${patient.physiotherapist.lastName}`}</td>
      </tr>
    );
  });

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
                <th>Actions</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Date of Birth</th>
                <th>Gender</th>
                <th>City</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Physiotherapist</th>
              </tr>
              {patientsListTableEl}
            </tbody>
          </table>
        )}
      </section>
    </section>
  );
};

export default PatientsList;
