import styles from "./PhysiosList.module.scss";
import { useRef, useContext, useState, useEffect } from "react";
import { deletePhysio } from "../../actions/actions";
import AppContext from "../../../store/AppProvider";
import FilterForm from "../../UI/Forms/FilterForm/FilterForm";
import filterListHandler from "../../../helpers/filterListHandler";
import List from "../../UI/List/List";

const PhysiosList = ({ rootPath }) => {
  const appCtx = useContext(AppContext);
  const {
    physios,
    setPhysios,
    physiosCollection,
    individualPatients,
    setIndividualPatients,
    individualCollection,
    groupPatients,
    setGroupPatients,
    groupsCollection,
    setIsLoading,
  } = appCtx;

  const [physiosList, setPhysiosList] = useState(physios);

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const idRef = useRef();
  const typeRef = useRef();

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
      label: "Type",
      name: "physioType",
      type: "text",
      inputRef: typeRef,
    },
    {
      label: "Id",
      name: "id",
      type: "text",
      inputRef: idRef,
    },
  ];

  const tableHeader = [
    "First name",
    "Last name",
    "email",
    "phone number",
    "type",
  ];
  const dataKeys = [
    "firstName",
    "lastName",
    "email",
    "phoneNumber",
    "physioType",
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
              [firstNameRef, lastNameRef, emailRef, idRef, typeRef],
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
          rootPath={rootPath}
          actions={true}
          deletionData={{
            physiosCollection: physiosCollection,
            setPhysios: setPhysios,
            patientType: {
              individual: individualPatients,
              group: groupPatients,
            },
            patientTypeCollection: {
              individual: individualCollection,
              group: groupsCollection,
            },
            setPatients: {
              individual: setIndividualPatients,
              group: setGroupPatients,
            },
          }}
          setIsLoading={setIsLoading}
          deleteHandler={deletePhysio}
        />
      </section>
    </section>
  );
};

export default PhysiosList;
