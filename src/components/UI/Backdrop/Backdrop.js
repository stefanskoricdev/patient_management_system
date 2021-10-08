import styles from "./Backdrop.module.scss";

const Backdrop = ({ children }) => {
  return (
    <section id="backdrop" className={styles.Backdrop}>
      {children}
    </section>
  );
};

export default Backdrop;
