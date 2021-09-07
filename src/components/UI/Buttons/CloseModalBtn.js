import styles from "./CloseModalBtn.module.scss";

const CloseModalBtn = ({ closeModal }) => {
  return (
    <button id="close-modal" className={styles.CloseBtn} onClick={closeModal}>
      <i className="fas fa-times"></i>
    </button>
  );
};

export default CloseModalBtn;
