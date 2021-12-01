import styles from "./AddEditPatient.module.scss";
import AddEditPatientForm from "./AddEditPatientForm/AddEditPatientForm";

const AddEditPatient = ({ physiotherapist }) => {
  return (
    <section className={styles.AddEditPatientWrapper}>
      <AddEditPatientForm physiotherapist={physiotherapist} />
    </section>
  );
};
export default AddEditPatient;
