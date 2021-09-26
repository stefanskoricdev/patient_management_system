import styles from "./IndividualSchedule.module.scss";

const colorPallete = [
  "FFE194",
  "6D97C9",
  "8CC3A0",
  "E9DA90",
  "F29D72",
  "D17484",
];

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
                const topPositionValue =
                  patient.position.topHours * 12 +
                  patient.position.topMinutes * 0.2;
                return (
                  <p
                    key={i}
                    style={
                      workingDays.length > 5
                        ? {
                            top: `${topPositionValue}rem`,
                            left: `${
                              (patient.position.left * 100) /
                                workingDays.length +
                              0.5
                            }%`,
                            width: `${100 / workingDays.length}%`,
                            height: `${patient.position.height * 0.2}rem`,
                            backgroundColor: `#${
                              colorPallete[
                                Math.floor(Math.random() * colorPallete.length)
                              ]
                            }`,
                          }
                        : {
                            top: `${topPositionValue}rem`,
                            left: `${patient.position.left * 20 + 0.5}%`,
                            height: `${patient.position.height * 0.2}rem`,
                            //This fixes issues with layout if there are less then 6 working days
                            backgroundColor: `#${
                              colorPallete[
                                Math.floor(Math.random() * colorPallete.length)
                              ]
                            }`,
                          }
                    }
                  >
                    {`${patient.firstName + " " + patient.lastName}`}
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
