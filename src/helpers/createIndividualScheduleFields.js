export const createIndividualScheduleFields = (
  dataContainer,
  patientModalHandler,
  physio,
  workingDays,
  workingHours
) => {
  let scheduleFields = [];
  const indexValue = workingDays.length * workingHours.length;
  const colorPallete = [
    "FFE194",
    "6D97C9",
    "8CC3A0",
    "E9DA90",
    "F29D72",
    "D17484",
  ];
  if (dataContainer.length > 0) {
    for (let i = 0; i < indexValue; i++) {
      const existingData = dataContainer.findIndex((data) =>
        data.id === `${physio}-patient${i}` ? data : null
      );
      scheduleFields.push(
        <div
          data-id={`${physio}-patient${i}`}
          onClick={patientModalHandler}
          key={i}
        >
          <p
            style={
              dataContainer[existingData]
                ? {
                    backgroundColor: `#${
                      colorPallete[
                        Math.floor(Math.random() * colorPallete.length)
                      ]
                    }`,
                    boxShadow: "5px 5px 15px rgb(159, 186, 176)",
                  }
                : { backgroundColor: "inherit" }
            }
            data-id={`${physio}-patient${i}`}
          >
            {existingData >= 0
              ? `${dataContainer[existingData].firstName} ${dataContainer[existingData].lastName}`
              : null}
          </p>
        </div>
      );
    }
  } else {
    for (let i = 0; i < indexValue; i++) {
      scheduleFields.push(
        <div
          onClick={patientModalHandler}
          data-id={`${physio}-patient${i}`}
          key={i}
        >
          <p data-id={`${physio}-patient${i}`}></p>
        </div>
      );
    }
  }
  return scheduleFields;
};
