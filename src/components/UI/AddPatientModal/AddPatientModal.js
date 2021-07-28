import { useState } from "react";
import styles from "./AddPatientModal.module.scss";

const AddPatientModal = (props) => {
  const [isFormPageChanged, setIsFormPageChanged] = useState(false);
  const changeFormInfoHandler = () => {
    setIsFormPageChanged((prevValue) => !prevValue);
  };

  return (
    <section id="addPatientModalWrapper" className={styles.AddPatientModal}>
      <form onSubmit={props.addPatient}>
        <header>
          <h2>Create New Patient</h2>
        </header>
        <main
          className={
            isFormPageChanged === true
              ? [styles.Main, styles["active"]].join(" ")
              : styles.Main
          }
        >
          <section className={styles.MainInfo}>
            <label>
              First Name:
              <input name="first-name" type="text" ref={props.firstName} />
            </label>
            <label>
              Last Name:
              <input name="last-name" type="text" ref={props.lastName} />
            </label>
            <section className={styles.GenderWrapper}>
              <label>Select gender: </label>
              <select name="gender" ref={props.gender}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </section>
            <label>
              Address:
              <input type="text" ref={props.address} />
            </label>
            <label>
              Phone Number:
              <input
                name="phone-number"
                type="tel"
                pattern="[0-9]{3}[0-9]{3}[0-9]{3}"
                ref={props.phoneNumber}
              />
            </label>
            <label>
              Date of Birth:
              <input name="date-of-birth" type="date" ref={props.dateOfBirth} />
            </label>
          </section>
          <section className={styles.AdditionalInfo}>
            <label>
              Observation:
              <textarea
                name="observation"
                rows="8"
                cols="80"
                ref={props.observation}
              />
            </label>
            <section className={styles.PhisioWrapper}>
              <label>Select physiotherapist:</label>
              <select name="physiotherapist-select" ref={props.physiotherapist}>
                <option value="Marko">Marko</option>
                <option value="Dijana">Dijana</option>
                <option value="Stefan">Stefan</option>
              </select>
            </section>
          </section>
        </main>
        <button onClick={changeFormInfoHandler} type="button">
          {isFormPageChanged === false ? "NEXT" : "BACK"}
        </button>
        <button type="submit">ADD</button>
      </form>
    </section>
  );
};
export default AddPatientModal;
