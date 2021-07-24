import styles from "./Backdrop.module.scss";
const Backdrop = (props) => {
  return <section className={styles.Backdrop}>{props.children}</section>;
};
export default Backdrop;
