import styles from "./IndividualSchedule.module.scss";

const IndividualSchedule = ({ patients, workingDays, workingHours }) => {
  const indexValue = workingDays.length * workingHours.length;
  const createScheduleBackground = () => {
    let scheduleFields = [];

    for (let i = 0; i < indexValue; i++) {
      scheduleFields.push(<div key={i}></div>);
    }

    return scheduleFields;
  };
  return (
    <section className={styles.IndividualScheduleWrapper}>
      <header className={styles.Header}>{workingDays}</header>
      <main className={styles.Main}>
        <section className={styles.Time}>
          <ul>{workingHours}</ul>
        </section>
        <section
          className={styles.IndividualSchedule}
          style={
            workingDays.length > 5
              ? {
                  gridTemplateColumns: `repeat(${workingDays.length}, ${
                    100 / workingDays.length
                  }% [col-start])`,
                  gridTemplateRows: `repeat(${workingHours.length}, 12rem [row-start])`,
                }
              : {
                  gridTemplateColumns: `repeat(${workingDays.length}, 20% [col-start])`,
                  //This fixes issues with layout if there are less then 6 working days
                }
          }
        >
          {createScheduleBackground()}
          {patients.length > 0
            ? patients.map((patient, i) => {
                return (
                  <p
                    key={i}
                    style={
                      workingDays.length > 5
                        ? {
                            top: `${patient.position.top * 12}rem`,
                            left: `${
                              (patient.position.left * 100) / workingDays.length
                            }%`,
                            width: `${100 / workingDays.length}%`,
                          }
                        : {
                            top: `${patient.position.top * 12}rem`,
                            left: `${patient.position.left * 20}%`,
                          }
                    }
                  >
                    {`${patient.firstName} ${patient.lastName}`}
                  </p>
                );
              })
            : null}
        </section>
      </main>
    </section>
  );
};

export default IndividualSchedule;
