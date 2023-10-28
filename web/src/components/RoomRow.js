import React from "react";
import { Link } from "react-router-dom";
import { formatAssetName, dailyBookings, bookingArray } from "../helpers/rooms";

// Accept the 24 hour dayHours array as the day's booking data for a room
const rowMapper = (dayHours, props) => {
  let tableRow = [];

  // Loop through each hour from 8AM to 9PM (starting at 8AM = 0)
  for (var i = 0; i < 13; i++) {
    // Extract the corresponding data from the 24 hour array
    let bookingData = dayHours[i + 8];

    // If the data for that hour is a number (not a booking object), there is no booking
    // Add a <td> element that indicates the time slot is available
    if (typeof bookingData == "number") {
      tableRow.push(
        <td className="table__cell--available">
          <Link
            to="/createbooking"
            onClick={() => {
              props.onSetRoom(props.room._id);
            }}
            className="table__link--available"
          >
            &nbsp;
          </Link>
        </td>
      );

      // If the data is an array, there are two booking objects
    } else if (Array.isArray(bookingData)) {
      // Determine which of the two bookings comes first and second
      let firstBookingData = bookingData[0].firstHalfHour
        ? bookingData[0]
        : bookingData[1];

      let secondBookingData = bookingData[0].secondHalfHour
        ? bookingData[0]
        : bookingData[1];

      tableRow.push(
        // <table className="table--booking--split">
        //   <tbody>
        //     <tr>
        <td className={`table__cell table__cell--booked`}>
          <span
            onClick={() => props.onShowBooking(firstBookingData)}
            className={`table__link--booked table__cell--${firstBookingData.group // Class name will show the business unit that made the booking, and whether the <td> element should be fully shaded, or half shaded (indicating a half-hour booking)
              .replace(/ /g, "-")
              .toLowerCase()} table__cell--first-half-hour`}
          >
            &nbsp;
          </span>
          <span
            onClick={() => props.onShowBooking(secondBookingData)}
            className={`table__link--booked table__cell--${secondBookingData.group // Class name will show the business unit that made the booking, and whether the <td> element should be fully shaded, or half shaded (indicating a half-hour booking)
              .replace(/ /g, "-")
              .toLowerCase()} table__cell--second-half-hour`}
          >
            &nbsp;
          </span>
        </td>
        // <td className={`table__cell table__cell--booked`}>

        // </td>
        //     </tr>
        //   </tbody>
        // </table>
      );
      // If there is a booking object, add a <td> element with custom class name to enable stlying
      // situation - first half hour booked
    } else if (bookingData.firstHalfHour) {
      tableRow.push(
        <td className={`table__cell table__cell--booked `}>
          <span
            onClick={() => props.onShowBooking(bookingData)}
            className={`table__link--booked table__cell--${bookingData.group // Class name will show the business unit that made the booking, and whether the <td> element should be fully shaded, or half shaded (indicating a half-hour booking)
              .replace(/ /g, "-")
              .toLowerCase()} table__cell--first-half-hour`}
          >
            &nbsp;
          </span>
          <Link
            to="/createbooking"
            onClick={() => {
              props.onSetRoom(props.room._id);
            }}
            className="table__right__link--available"
          >
            &nbsp;
          </Link>
        </td>
      );
    } else if (bookingData.secondHalfHour) {
      // situation - second half hour booked
      tableRow.push(
        <td className={`table__cell table__cell--booked `}>
          <Link
            to="/createbooking"
            onClick={() => {
              props.onSetRoom(props.room._id);
            }}
            className="table__left__link--available"
          >
            &nbsp;
          </Link>
          <span
            onClick={() => props.onShowBooking(bookingData)}
            className={`table__link--booked table__cell--${bookingData.group // Class name will show the business unit that made the booking, and whether the <td> element should be fully shaded, or half shaded (indicating a half-hour booking)
              .replace(/ /g, "-")
              .toLowerCase()} table__cell--second-half-hour`}
          >
            &nbsp;
          </span>
        </td>
      );
    } else if (bookingData.duration >= 1) {
      // situation - whole hour booked
      tableRow.push(
        <td className={`table__cell table__cell--booked `}>
          <span
            onClick={() => props.onShowBooking(bookingData)}
            className={`table__link--booked table__cell--${bookingData.group // Class name will show the business unit that made the booking, and whether the <td> element should be fully shaded, or half shaded (indicating a half-hour booking)
              .replace(/ /g, "-")
              .toLowerCase()}`}
          >
            &nbsp;
          </span>
        </td>
      );
    }
  }
  return tableRow;
};

const RoomRow = (props) => (
  <tr className="table__row">
    <th scope="row" className="table__cell--align-left">
      <Link
        to="/createbooking"
        onClick={() => props.onSetRoom(props.room._id)}
        className="table__link"
      >
        {props.room.name}
      </Link>
      {/* <ul>
        {Object.keys(props.room.assets).map(
          (asset) =>
            props.room.assets[asset] && (
              <li
                key={asset}
                onClick={props.onShowBooking}
                className="table__data--asset"
              >
                {formatAssetName(asset)}
              </li>
            )
        )}
      </ul> */}
    </th>
    {rowMapper(bookingArray(dailyBookings(props.date, props.bookings)), props)}
  </tr>
);

export default RoomRow;
