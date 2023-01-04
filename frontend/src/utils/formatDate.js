import moment from "moment";

export const formatDate = (date) => {
  const newDate = moment(`${date}`).utc().format("DD/MMM/YYYY");
  return newDate;
};
