import moment from "moment";
//create a utc time and convert it to local
export const localTime = (time) => {
  return moment.utc(time).local();
};
