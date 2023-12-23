import React from "react";
import Datetime from "react-datetime";
import moment from "moment";

var yesterday = moment().subtract(1, "day");
var validDate = function (current) {
  return current.isAfter(yesterday);
};

const Calendar = (props) => {
  const renderDay = (tdProps, currentDate, selectedDate) => {
    return (
      <td
        {...tdProps}
        className={`${tdProps.className} ${
          moment(props.date).format("YYYY-MM-DD") ===
          moment(currentDate).format("YYYY-MM-DD")
            ? "rdt_selected"
            : ""
        }`}
      >
        {currentDate.date()}
      </td>
    );
  };
  return (
    <Datetime
      value={props.date}
      dateFormat="YYYY-MM-DD"
      timeFormat={false}
      input={false}
      utc={false}
      onChange={(event) => props.setCalendarDate(event._d)}
      renderDay={renderDay}
      // isValidDate={validDate}
    />
  );
};

export default Calendar;
