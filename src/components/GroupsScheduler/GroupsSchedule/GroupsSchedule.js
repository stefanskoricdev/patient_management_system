import styles from "./GroupsSchedule.module.scss";
import { Link } from "react-router-dom";
const GroupSchedule = ({ physiotherapist }) => {
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
            to={`/patients/group-patients/${physiotherapist.firstName}/add-group-patient/${physiotherapist.id}-${config[i].workingDays}-${config[i].workingHours}-a`}
            data-id={`${physiotherapist.id}-${config[i].workingDays}-${config[i].workingHours}-a`}
          ></Link>
          <Link
            to={`/patients/group-patients/${physiotherapist.firstName}/add-group-patient/${physiotherapist.id}-${config[i].workingDays}-${config[i].workingHours}-b`}
            data-id={`${physiotherapist.id}-${config[i].workingDays}-${config[i].workingHours}-b`}
          ></Link>
          <Link
            to={`/patients/group-patients/${physiotherapist.firstName}/add-group-patient/${physiotherapist.id}-${config[i].workingDays}-${config[i].workingHours}-c`}
            data-id={`${physiotherapist.id}-${config[i].workingDays}-${config[i].workingHours}-c`}
          ></Link>
          <Link
            to={`/patients/group-patients/${physiotherapist.firstName}/add-group-patient/${physiotherapist.id}-${config[i].workingDays}-${config[i].workingHours}-d`}
            data-id={`${physiotherapist.id}-${config[i].workingDays}-${config[i].workingHours}-d`}
          ></Link>
          <Link
            to={`/patients/group-patients/${physiotherapist.firstName}/add-group-patient/${physiotherapist.id}-${config[i].workingDays}-${config[i].workingHours}-e`}
            data-id={`${physiotherapist.id}-${config[i].workingDays}-${config[i].workingHours}-e`}
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
        </section>
      </main>
    </section>
  );
};

export default GroupSchedule;
