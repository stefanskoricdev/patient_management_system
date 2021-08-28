export const createIndividualScheduleFields = (
  dataContainer,
  patientModalHandler,
  physio
) => {
  let scheduleFields = [];
  const colorPallete = [
    "FFE194",
    "6D97C9",
    "8CC3A0",
    "E9DA90",
    "F29D72",
    "D17484",
  ];
  if (dataContainer.length > 0) {
    for (let i = 0; i < 70; i++) {
      const existingData = dataContainer.findIndex((data) =>
        data.id === `${physio}-patient${i}` ? data : null
      );
      scheduleFields.push(
        <li
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
        </li>
      );
    }
  } else {
    for (let i = 0; i < 70; i++) {
      scheduleFields.push(
        <li data-id={`${physio}-patient${i}`} key={i}>
          <p
            onClick={patientModalHandler}
            data-id={`${physio}-patient${i}`}
          ></p>
        </li>
      );
    }
  }
  return scheduleFields;
};
