export const createGroupsScheduleFields = (
  dataContainer,
  physio,
  days,
  time,
  patientModalHandler
) => {
  let scheduleFields = [];
  const indexValue = days.length * time.length;
  if (dataContainer.length > 0) {
    for (let i = 0; i < indexValue; i++) {
      scheduleFields.push(
        <li onClick={patientModalHandler} key={i}>
          <p data-id={`${physio}-patient${i}a`}>
            {dataContainer.map((patient) =>
              patient.id === `${physio}-patient${i}a`
                ? `${patient.firstName} ${patient.lastName}`
                : null
            )}
          </p>
          <p data-id={`${physio}-patient${i}b`}>
            {dataContainer.map((patient) =>
              patient.id === `${physio}-patient${i}b`
                ? `${patient.firstName} ${patient.lastName}`
                : null
            )}
          </p>
          <p data-id={`${physio}-patient${i}c`}>
            {dataContainer.map((patient) =>
              patient.id === `${physio}-patient${i}c`
                ? `${patient.firstName} ${patient.lastName}`
                : null
            )}
          </p>
          <p data-id={`${physio}-patient${i}d`}>
            {dataContainer.map((patient) =>
              patient.id === `${physio}-patient${i}d`
                ? `${patient.firstName} ${patient.lastName}`
                : null
            )}
          </p>
        </li>
      );
    }
  } else {
    for (let i = 0; i < indexValue; i++) {
      scheduleFields.push(
        <li onClick={patientModalHandler} key={i}>
          <p data-id={`${physio}-patient${i}a`}></p>
          <p data-id={`${physio}-patient${i}b`}></p>
          <p data-id={`${physio}-patient${i}c`}></p>
          <p data-id={`${physio}-patient${i}d`}></p>
        </li>
      );
    }
  }
  return scheduleFields;
};
