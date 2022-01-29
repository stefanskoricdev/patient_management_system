import styles from "./IndividualSchedule.module.scss";
import { Link } from "react-router-dom";
import { colorPallete } from "../../../helpers/appConfig";

const IndividualSchedule = ({ patients, physiotherapist }) => {
  const { firstName, lastName, workingDays, workingHours } = physiotherapist;
  const indexValue = workingDays.length * workingHours.length;

  const workingDaysEl = workingDays.map((day) => (
    <li key={day}>{day.substr(2)}</li>
  ));
  const workingHoursEl = workingHours.map((time) => {
    const substrStartIndex = time.indexOf("_");
    return (
      <li key={time}>
        <div></div>
        <div></div>
        <div></div>
        {time.substr(substrStartIndex + 1)}
      </li>
    );
  });

  const createScheduleBackground = () => {
    let scheduleFields = [];

    for (let i = 0; i < indexValue; i++) {
      scheduleFields.push(
        <div key={i}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      );
    }
    return scheduleFields;
  };

  const gridMoreDays = {
    gridTemplateColumns: `repeat(${workingDays.length}, ${
      100 / workingDays.length
    }% [col-start])`,
    gridTemplateRows: `repeat(${workingHours.length}, 12rem [row-start])`,
  };
  let gridLessDays = {
    gridTemplateColumns: `repeat(${workingDays.length}, 20% [col-start])`,
  };

  return (
    <section className={styles.IndividualScheduleWrapper}>
      <header className={styles.Header}>{workingDaysEl}</header>
      <main className={styles.Main}>
        <section className={styles.Time}>
          <ul>{workingHoursEl}</ul>
        </section>
        <section
          className={styles.IndividualSchedule}
          style={
            workingDays.length > 5 ? gridMoreDays : gridLessDays
            //This fixes issues with layout if there are less then 6 working days
          }
        >
          {createScheduleBackground()}
          {patients.length > 0
            ? patients.map((patient) => {
                let pat = [];
                for (let i = 0; i < patient.appointment.length; i++) {
                  const dayIndex = workingDays.findIndex(
                    (day) => day === patient.appointment[i].day
                  );
                  const hoursIndex = workingHours.findIndex(
                    (hour) => hour === patient.appointment[i].hours
                  );
                  const positionValues = {
                    topPositionValue:
                      hoursIndex * 12 + patient.appointment[i].minutes * 0.2,
                    leftPosValueMoreDays:
                      (dayIndex * 100) / workingDays.length + 0.5,
                    leftPosValueLessDays: dayIndex * 20 + 0.5,
                    // 0.5% is to centralize element inside parent el
                    //which is 20% width!
                    heightValue: patient.appointment[i].duration * 0.2 - 0.1,
                    //0.1rem subtraction is to avoid shadow of element to overflow to
                    //element below
                    widthValue: 100 / workingDays.length - 1,
                  };
                  const {
                    topPositionValue,
                    leftPosValueMoreDays,
                    heightValue,
                    widthValue,
                    leftPosValueLessDays,
                  } = positionValues;

                  pat.push(
                    <Link
                      //We pass an index to the route so we can use it in PATIENT DETAIL and EDIT PATIENT components
                      //To enable adding multiple appointments to same patient end to delete those appointments separately
                      to={`/patients/individual-patients/${firstName.toLowerCase()}${lastName.toLowerCase()}/patient-details/${
                        patient.id
                      }index=${i}`}
                      key={patient.id + i}
                      style={
                        workingDays.length > 5
                          ? {
                              top: `${topPositionValue}rem`,
                              left: `${leftPosValueMoreDays}%`,
                              width: `${widthValue}%`,
                              height: `${heightValue}rem`,
                              backgroundColor: `#${
                                colorPallete[
                                  Math.floor(
                                    Math.random() * colorPallete.length
                                  )
                                ]
                              }`,
                            }
                          : {
                              top: `${topPositionValue}rem`,
                              left: `${leftPosValueLessDays}%`,
                              height: `${heightValue}rem`,
                              backgroundColor: `#${
                                colorPallete[
                                  Math.floor(
                                    Math.random() * colorPallete.length
                                  )
                                ]
                              }`,
                            }
                        //This fixes issues with layout if there are less then 6 working days
                      }
                    >
                      {`${patient.firstName + " " + patient.lastName}`}
                    </Link>
                  );
                }
                return pat;
              })
            : null}
        </section>
      </main>
    </section>
  );
};

export default IndividualSchedule;
