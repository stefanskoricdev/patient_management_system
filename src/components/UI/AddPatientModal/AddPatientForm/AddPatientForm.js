import styles from "./AddPatientForm.module.scss";

const AddPatientForm = ({
  submit,
  firstName,
  lastName,
  gender,
  city,
  address,
  phoneNumber,
  dateOfBirth,
  observation,
  day,
  hour,
  isFormChanged,
  changeForm,
  physiotherapist,
}) => {
  return (
    <form className={styles.AddPatientForm} onSubmit={submit}>
      <header>
        <h2>Create New Patient</h2>
      </header>
      <main
        className={
          isFormChanged === true
            ? [styles.Main, styles["active"]].join(" ")
            : styles.Main
        }
      >
        <section className={styles.MainInfo}>
          <label>
            First Name:
            <input name="first-name" type="text" ref={firstName} />
          </label>
          <label>
            Last Name:
            <input name="last-name" type="text" ref={lastName} />
          </label>
          <section className={styles.GenderWrapper}>
            <label>Select gender: </label>
            <select name="gender" ref={gender}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </section>
          <label>
            City:
            <input type="text" ref={city} />
          </label>
          <label>
            Address:
            <input type="text" ref={address} />
          </label>
          <label>
            Phone Number:
            <input
              name="phone-number"
              type="tel"
              pattern="[0-9]{3}[0-9]{3}[0-9]{3}"
              ref={phoneNumber}
            />
          </label>
          <label>
            Date of Birth:
            <input name="date-of-birth" type="date" ref={dateOfBirth} />
          </label>
        </section>
        <section className={styles.AdditionalInfo}>
          <label>
            Observation:
            <textarea name="observation" rows="8" cols="80" ref={observation} />
          </label>
          <div className={styles.WorkingDays}>
            <label>
              <h3>Select day of visit:</h3>
              <select name="days" ref={day}>
                {physiotherapist.workingDays.map((day, i) => {
                  return (
                    <option key={i} value={i}>
                      {day.substr(2)}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>
          <div className={styles.WorkingHours}>
            <label>
              <h3>Select time of visit:</h3>
              <select name="hours" ref={hour}>
                {physiotherapist.workingHours.map((hour, i) => {
                  return (
                    <option key={i} value={i}>
                      {hour}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>
        </section>
      </main>
      <button onClick={changeForm} type="button">
        {isFormChanged === false ? "NEXT" : "BACK"}
      </button>
      <button type="submit">ADD</button>
    </form>
  );
};

export default AddPatientForm;
