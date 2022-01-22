import styles from "./Popover.module.scss";

const Popover = ({ children, isVisible }) => {
  return (
    <div
      className={
        isVisible
          ? [styles.Popover, styles["active"]].join(" ")
          : styles.Popover
      }
    >
      <ul>{children}</ul>
    </div>
  );
};

export default Popover;
