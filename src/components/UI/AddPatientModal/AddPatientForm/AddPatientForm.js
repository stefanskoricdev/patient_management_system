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
  minutes,
  duration,
  isFormChanged,
  changeForm,
  physiotherapist,
}) => {
  const { workingDays, workingHours } = physiotherapist;
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
          <section className={styles.WorkingDays}>
            <h3>Select day of visit:</h3>
            <label>
              <select name="days" ref={day}>
                {workingDays.map((day, i) => {
                  return (
                    <option key={i} value={i}>
                      {day.substr(2)}
                    </option>
                  );
                })}
              </select>
            </label>
          </section>
          <section className={styles.WorkingHours}>
            <h3>Select time of visit:</h3>
            <label>
              <p>Hours:</p>
              <select name="hours" ref={hour}>
                {workingHours.map((hour, i) => {
                  return (
                    <option key={i} value={i}>
                      {hour.substr(0, hour.length - 3)}
                    </option>
                  );
                })}
              </select>
            </label>
            <label>
              <p>Minutes:</p>
              <select name="minutes" ref={minutes}>
                <option value={0}>0</option>
                <option value={15}>15</option>
                <option value={30}>30</option>
                <option value={45}>45</option>
              </select>
            </label>
            <h3>Treatment duration:</h3>
            <label>
              <p>Minutes: </p>
              <input
                type="number"
                name="duration"
                min="30"
                max={workingHours.length * 60}
                placeholder="30"
                ref={duration}
              />
            </label>
          </section>
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
