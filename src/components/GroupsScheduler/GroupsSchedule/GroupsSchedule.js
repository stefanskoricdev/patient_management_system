import styles from "./GroupsSchedule.module.scss";
import { Link } from "react-router-dom";
const GroupSchedule = ({ physiotherapist, patients }) => {
  const { groupCfg: config } = physiotherapist;

  const createScheduleBackground = () => {
    let scheduleFields = [];
    for (let i = 0; i < config.length; i++) {
      scheduleFields.push(
        <section key={i}>
          <header>
            <p>{`${config[i].workingDays}(${config[i].workingHours})`}</p>
          </header>
          <Link
            to={{
              pathname: `/patients/group-patients/${physiotherapist.firstName}/add-group-patient/${physiotherapist.id}-${config[i].workingDays}-${config[i].workingHours}-a`,
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
              pathname: `/patients/group-patients/${physiotherapist.firstName}/add-group-patient/${physiotherapist.id}-${config[i].workingDays}-${config[i].workingHours}-b`,
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
              pathname: `/patients/group-patients/${physiotherapist.firstName}/add-group-patient/${physiotherapist.id}-${config[i].workingDays}-${config[i].workingHours}-c`,
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
              pathname: `/patients/group-patients/${physiotherapist.firstName}/add-group-patient/${physiotherapist.id}-${config[i].workingDays}-${config[i].workingHours}-d`,
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
              pathname: `/patients/group-patients/${physiotherapist.firstName}/add-group-patient/${physiotherapist.id}-${config[i].workingDays}-${config[i].workingHours}-e`,
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
                let pat = [];
                const groupIndex = config.findIndex(
                  (cfg) =>
                    cfg.workingHours === patient.appointment.time &&
                    cfg.workingDays === patient.appointment.day
                );
                const positionValues = {
                  top: patient.appointment.slot * 4,
                  left: groupIndex * 12,
                };
                console.log(positionValues);
                return (
                  <p
                    style={{
                      top: `${positionValues.top}rem`,
                      left: `${positionValues.left}rem`,
                    }}
                    className={styles.PatientBox}
                    key={patient.id}
                  >{`${patient.firstName + " " + patient.lastName}`}</p>
                );
              })
            : null}
        </section>
      </main>
    </section>
  );
};

export default GroupSchedule;
