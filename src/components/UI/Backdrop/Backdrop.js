import styles from "./Backdrop.module.scss";

const Backdrop = ({ closeModal, children }) => {
  return (
    <section id="backdrop" onClick={closeModal} className={styles.Backdrop}>
      {children}
    </section>
  );
};

export default Backdrop;
