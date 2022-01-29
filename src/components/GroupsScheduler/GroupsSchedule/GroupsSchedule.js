import styles from "./GroupsSchedule.module.scss";
import { Link } from "react-router-dom";
import { colorPallete } from "../../../helpers/appConfig";

const GroupSchedule = ({ physiotherapist, patients }) => {
  const { groupCfg: config } = physiotherapist;

  const createScheduleBackground = () => {
    let scheduleFields = [];
    for (let i = 0; i < config.length; i++) {
      scheduleFields.push(
        <section className={styles.ScheduleBackground} key={i}>
          <header>
            <p>{`${config[i].workingDays}(${config[i].workingHours})`}</p>
          </header>
          <Link
            to={{
              pathname: `/patients/group-patients/${physiotherapist.firstName}${physiotherapist.lastName}/add-group-patient/${physiotherapist.id}-${config[i].workingDays}-${config[i].workingHours}-a`,
              query: {
                time: `${config[i].workingHours}`,
                day: `${config[i].workingDays}`,
                slot: 1,
                id: `${physiotherapist.id}-${config[i].workingDays}-${config[i].workingHours}-a`,
              },
            }}
          ></Link>
          <Link
            to={{
              pathname: `/patients/group-patients/${physiotherapist.firstName}${physiotherapist.lastName}/add-group-patient/${physiotherapist.id}-${config[i].workingDays}-${config[i].workingHours}-b`,
              query: {
                time: `${config[i].workingHours}`,
                day: `${config[i].workingDays}`,
                slot: 2,
                id: `${physiotherapist.id}-${config[i].workingDays}-${config[i].workingHours}-b`,
              },
            }}
          ></Link>
          <Link
            to={{
              pathname: `/patients/group-patients/${physiotherapist.firstName}${physiotherapist.lastName}/add-group-patient/${physiotherapist.id}-${config[i].workingDays}-${config[i].workingHours}-c`,
              query: {
                time: `${config[i].workingHours}`,
                day: `${config[i].workingDays}`,
                slot: 3,
                id: `${physiotherapist.id}-${config[i].workingDays}-${config[i].workingHours}-c`,
              },
            }}
          ></Link>
          <Link
            to={{
              pathname: `/patients/group-patients/${physiotherapist.firstName}${physiotherapist.lastName}/add-group-patient/${physiotherapist.id}-${config[i].workingDays}-${config[i].workingHours}-d`,
              query: {
                time: `${config[i].workingHours}`,
                day: `${config[i].workingDays}`,
                slot: 4,
                id: `${physiotherapist.id}-${config[i].workingDays}-${config[i].workingHours}-d`,
              },
            }}
          ></Link>
          <Link
            to={{
              pathname: `/patients/group-patients/${physiotherapist.firstName}${physiotherapist.lastName}/add-group-patient/${physiotherapist.id}-${config[i].workingDays}-${config[i].workingHours}-e`,
              query: {
                time: `${config[i].workingHours}`,
                day: `${config[i].workingDays}`,
                slot: 5,
                id: `${physiotherapist.id}-${config[i].workingDays}-${config[i].workingHours}-e`,
              },
            }}
          ></Link>
        </section>
      );
    }
    return scheduleFields;
  };

  return (
    <section className={styles.GroupScheduleWrapper}>
      <main className={styles.Main}>
        <section className={styles.Schedule}>
          {createScheduleBackground()}
          {patients.length > 0
            ? patients.map((patient) => {
                const groupIndex = config.findIndex(
                  (cfg) =>
                    cfg.workingHours === patient.appointment.time &&
                    cfg.workingDays === patient.appointment.day
                );
                const positionValues = {
                  top: patient.appointment.slot * 4,
                  left: groupIndex * 12,
                };
                return (
                  <Link
                    to={`/patients/group-patients/${physiotherapist.firstName}${physiotherapist.lastName}/group-patient-details/${patient.id}`}
                    style={{
                      top: `${positionValues.top}rem`,
                      left: `${positionValues.left}rem`,
                      backgroundColor: `#${
                        colorPallete[
                          Math.floor(Math.random() * colorPallete.length)
                        ]
                      }`,
                    }}
                    className={styles.PatientCard}
                    key={patient.id}
                  >{`${patient.firstName + " " + patient.lastName}`}</Link>
                );
              })
            : null}
        </section>
      </main>
    </section>
  );
};

export default GroupSchedule;
