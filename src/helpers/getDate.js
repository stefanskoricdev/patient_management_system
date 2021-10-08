import moment from "moment";

const getDate = () => {
  const time = new Date();
  const formatedTime = moment(time).format("MMMM Do YYYY");
  return formatedTime;
};

export default getDate;
