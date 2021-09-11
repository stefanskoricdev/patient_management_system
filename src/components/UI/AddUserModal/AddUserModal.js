import AddUserForm from "./AddUserForm/AddUserForm";
import styles from "./AddUserModal.module.scss";

const AddUserModal = () => {
  return (
    <section className={styles.AddUserWrapper}>
      <AddUserForm />
    </section>
  );
};

export default AddUserModal;
