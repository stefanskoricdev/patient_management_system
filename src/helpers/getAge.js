export const getAge = (dateOfBirth) => {
  const dob = new Date(dateOfBirth);
  const monthDiff = Date.now() - dob.getTime();
  const ageDt = new Date(monthDiff);
  const year = ageDt.getUTCFullYear();
  const age = Math.abs(year - 1970);
  return age;
};
