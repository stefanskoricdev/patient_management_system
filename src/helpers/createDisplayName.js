export const createDisplayName = (email) => {
  const getIndex = email.indexOf("@");
  const displayName = email.slice(0, getIndex);
  return displayName.charAt(0).toUpperCase() + displayName.slice(1);
};
