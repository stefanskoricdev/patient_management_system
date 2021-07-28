import moment from "moment";

const getTime = () => {
  const time = new Date();
  const formatedTime = moment(time).format("MMMM Do YYYY");
  return formatedTime;
};

export default getTime;
