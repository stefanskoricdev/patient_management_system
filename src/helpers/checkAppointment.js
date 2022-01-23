export const checkAppointment = (
  patientType,
  physio,
  newPatient,
  mode,
  appointmentIndex
) => {
  //Take all patients from targeted physio
  const targetedPatients = patientType.filter(
    (patient) =>
      `${patient.physiotherapist.firstName} ${patient.physiotherapist.lastName}` ===
      `${physio.firstName} ${physio.lastName}`
  );
  if (targetedPatients.length > 0) {
    //Transform them so we pass an id to patient.position object,
    //We need that so we avoid being rejected to edit existing appointment
    const transformedPatients = targetedPatients.map((patient) => {
      return patient.appointment.map((pat) => {
        const dayIndex = physio.workingDays.findIndex((day) => day === pat.day);
        const hoursIndex = physio.workingHours.findIndex(
          (hour) => hour === pat.hours
        );
        return {
          ...pat,
          day: dayIndex,
          hours: hoursIndex,
          minutes: parseInt(pat.minutes),
          duration: parseInt(pat.duration),
          id: patient.id,
        };
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
      const topHours = position.hours * 60;
      const topMinutes = position.minutes;
      const day = position.day;
      const duration = position.duration;
      const appointmentStart = topHours + topMinutes;
      const appointmentEnd = appointmentStart + duration;
      return {
        appointmentStart: appointmentStart,
        appointmentEnd: appointmentEnd,
        day: day,
        id: position.id,
        appointmentIndex: position.appointmentIndex,
      };
    });

    const newPatientTransformedPositions = newPatient.appointment.map(
      (appointment) => {
        const dayIndex = physio.workingDays.findIndex(
          (day) => day === appointment.day
        );
        const hoursIndex = physio.workingHours.findIndex(
          (hour) => hour === appointment.hours
        );
        const topHours = hoursIndex * 60;
        const topMinutes = parseInt(appointment.minutes);
        const day = dayIndex;
        const duration = parseInt(appointment.duration);
        const appointmentStart = topHours + topMinutes;
        const appointmentEnd = appointmentStart + duration;
        return {
          appointmentStart: appointmentStart,
          appointmentEnd: appointmentEnd,
          day: day,
        };
      }
    );

    //Conditions which create "red zones" on schedule so we cant appoint a patient
    //to allready taken day and time
    const isTakenResults = [];
    transformedAllPositions.forEach((position) => {
      const { appointmentStart, appointmentEnd, day } = mode
        ? //If in ADD MODE add positions on 0 index because when adding new pat we cant make multiple positions
          newPatientTransformedPositions[0]
        : //If EDIT MODE we take appointment index (which we get from our route. Number at the end of route) to target same user but specific positions,
          //(This is the case with patients with multiple appointments)!
          newPatientTransformedPositions[appointmentIndex];
      if (
        (newPatient.id !== position.id ||
          (newPatient.id === position.id &&
            appointmentIndex !== position.appointmentIndex)) &&
        day === position.day &&
        appointmentStart >= position.appointmentStart &&
        appointmentStart < position.appointmentEnd
      ) {
        isTakenResults.push(true);
      } else if (
        (newPatient.id !== position.id ||
          (newPatient.id === position.id &&
            appointmentIndex !== position.appointmentIndex)) &&
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
  } else {
    return [false];
  }
};
