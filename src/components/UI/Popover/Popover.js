import styles from "./Popover.module.scss";
import { useEffect } from "react";

const Popover = ({ children, setIsVisible, isVisible }) => {
  useEffect(() => {
    const onWindowClick = () => {
      if (isVisible) {
        setIsVisible(false);
        return;
      }
    };

    window.addEventListener("click", onWindowClick);

    return () => {
      window.removeEventListener("click", onWindowClick);
    };
  }, [isVisible, setIsVisible]);
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
