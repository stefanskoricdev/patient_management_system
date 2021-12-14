import styles from "./AddEditGroupPatient.module.scss";
import AddEditGroupPatientForm from "./AddEditGroupPatientForm/AddEditGroupPatientForm";

const AddEditGroupPatient = ({ physiotherapist }) => {
  return (
    <section className={styles.AddEditGroupPatientWrapper}>
      <AddEditGroupPatientForm physiotherapist={physiotherapist} />
    </section>
  );
};

export default AddEditGroupPatient;
