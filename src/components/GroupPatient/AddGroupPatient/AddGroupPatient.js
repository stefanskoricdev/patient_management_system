import styles from "./AddGroupPatient.module.scss";
import AddGroupPatientForm from "./AddGroupPatientForm/AddGroupPatientForm";

const AddGroupPatient = ({ physiotherapist }) => {
  return (
    <section className={styles.AddGroupPatientWrapper}>
      <AddGroupPatientForm physiotherapist={physiotherapist} />
    </section>
  );
};

export default AddGroupPatient;
