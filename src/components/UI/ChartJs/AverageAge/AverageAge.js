import styles from "./AverageAge.module.scss";
import { getAge } from "../../../../helpers/getAge";
import CountUp from "react-countup";

const AverageAge = ({ patients, isLoading }) => {
  const patientsAge = patients.map((patient) => getAge(patient.dateOfBirth));
  const patientsTotalAge = patientsAge.reduce((prevValue, currValue) => {
    return prevValue + currValue;
  }, 0);
  const patientsAvgAge = patientsTotalAge / patients.length;

  return (
    <div className={styles.AverageAge}>
      <h1>Average Age</h1>
      <p>
        {isLoading && 0}
        <CountUp duration={0.5} end={patientsAvgAge} />
      </p>
    </div>
  );
};

export default AverageAge;
