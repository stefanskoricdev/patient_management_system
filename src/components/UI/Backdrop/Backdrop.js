import styles from "./Backdrop.module.scss";

const Backdrop = (props) => {
  return (
    <section
      id="backdrop"
      onClick={props.closeModal}
      className={styles.Backdrop}
    >
      {props.children}
    </section>
  );
};

export default Backdrop;
