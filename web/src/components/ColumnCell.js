import React from "react";
import { dailyBookings, bookingArray } from "../helpers/rooms";

const ColumnCell = (props) => {
  // Get the day's bookings for a room
  let bookings = dailyBookings(props.date, props.bookings);

  // Add the day's bookings to a 24 hour array
  let dayHours = bookingArray(bookings);

  // Extract the corresponding data for a single hour from the 24 hour array
  let bookingData = dayHours[props.hour];

  // Data to be returned
  let columnData = "";

  // If the data for that hour is a number (not a booking object), there is no booking
  // Return a <td> element that indicates the time slot is available
  if (typeof bookingData == "number") {
    columnData = <td className="table__cell--available">Available</td>;

    // If the data for that hour is an array, this means there are two bookings to be rendered
  } else if (Array.isArray(bookingData)) {
    // Determine which of the two bookings comes first and second
    let firstBookingData = bookingData[0].firstHalfHour
      ? bookingData[0]
      : bookingData[1];

    let secondBookingData = bookingData[0].secondHalfHour
      ? bookingData[0]
      : bookingData[1];

    columnData = (
      <table className="table--nested">
        <tbody>
          <tr className="table__row--no-border table__row--border-bottom">
            <td
              onClick={() => props.onShowBooking(firstBookingData)}
              className={`table__cell--${firstBookingData.group
                .replace(/ /g, "-")
                .toLowerCase()} table__cell--subcell`}
            >
              {firstBookingData.group}
            </td>
          </tr>
          <tr className="table__row--no-border">
            <td
              onClick={() => props.onShowBooking(secondBookingData)}
              className={`table__cell--${secondBookingData.group
                .replace(/ /g, "-")
                .toLowerCase()} table__cell--subcell`}
            >
              {secondBookingData.group}
            </td>
          </tr>
        </tbody>
      </table>
    );
  } else if(bookingData.firstHalfHour && bookingData.secondHalfHour){
    // If there is a booking object for the full hour, return a single <td> cell
      columnData = (
        <td
          onClick={() => props.onShowBooking(bookingData)}
          className={`table__cell--${bookingData.group
            .replace(/ /g, "-")
            .toLowerCase()}`}
        >
          {bookingData.group}
        </td>
      ); 
  }
  else if (bookingData.firstHalfHour) {
    columnData = (
      <table className="table--nested">
        <tbody>
          <tr className="table__row--no-border table__row--border-bottom">
            <td
              onClick={() => props.onShowBooking(bookingData)}
              className={`table__cell--${bookingData.group
                .replace(/ /g, "-")
                .toLowerCase()} table__cell--subcell`}
            >
              {bookingData.group}
            </td>
          </tr>
          <tr className="table__row--no-border">
            <td className="table__cell--subcell available">Available</td>
          </tr>
        </tbody>
      </table>
    );
    // If there is a booking object, but only for the second half of the hour, return a nested table to split the table data for that cell into two rows
  } else if (bookingData.secondHalfHour) {
    columnData = (
      <table className="table--nested">
        <tbody>
          <tr className="table__row--no-border table__row--border-bottom">
            <td className="table__cell--subcell available">Available</td>
          </tr>
          <tr className="table__row--no-border">
            <td
              onClick={() => props.onShowBooking(bookingData)}
              className={`table__cell--${bookingData.group
                .replace(/ /g, "-")
                .toLowerCase()} table__cell--subcell`}
            >
              {bookingData.group}
            </td>
          </tr>
        </tbody>
      </table>
    );

  } 
  return columnData;
};

export default ColumnCell;
