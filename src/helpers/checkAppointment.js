export const checkAppointment = (
  patientType,
  physio,
  newPatientTransformedPositions,
  newPatient,
  mode,
  appointmentIndex
) => {
  //Take all patients from targeted physio
  const targetedPatients = patientType.filter(
    (patient) => patient.physiotherapist === physio.firstName
  );
  //Transform them so we pass an id to patient.position object,
  //We need that so we avoid being rejected to edit existing appointment
  const transformedPatients = targetedPatients.map((patient) => {
    return patient.position.map((pat) => {
      return { ...pat, id: patient.id };
    });
  });
  //Reduce all patient positions to one array so we can map through
  //and see if some position matches position of new patient which is created
  const allPatientPositions = transformedPatients.reduce(
    (currValue, prevValue) => currValue.concat(prevValue)
  );
  //Transform hours to minutes so we can make "red zones", and if newly created patient
  //is in "red zone" that meens that appointment is taken
  const transformedAllPositions = allPatientPositions.map((position) => {
    const topHours = parseInt(position.topHours) * 60;
    const topMinutes = parseInt(position.topMinutes);
    const left = parseInt(position.left);
    const height = parseInt(position.height);
    const appointmentStart = topHours + topMinutes;
    const appointmentEnd = appointmentStart + height;
    return {
      appointmentStart: appointmentStart,
      appointmentEnd: appointmentEnd,
      day: left,
      id: position.id,
    };
  });
  //Conditions which create "red zones" on schedule so we cant appoint a patient
  //to allready taken day and time
  const isTakenResults = [];
  transformedAllPositions.forEach((position) => {
    const { appointmentStart, appointmentEnd, day } = mode
      ? newPatientTransformedPositions[0]
      : newPatientTransformedPositions[appointmentIndex];
    if (
      newPatient.id !== position.id &&
      day === position.day &&
      appointmentStart >= position.appointmentStart &&
      appointmentStart < position.appointmentEnd
    ) {
      isTakenResults.push(true);
    } else if (
      newPatient.id !== position.id &&
      day === position.day &&
      appointmentEnd > position.appointmentStart &&
      appointmentEnd < position.appointmentEnd
    ) {
      isTakenResults.push(true);
    } else {
      isTakenResults.push(false);
    }
  });
  return isTakenResults;
};
