import React from "react";
import moment from "moment";
import momentTimezone from "moment-timezone";
import { localTime } from "./common";

const formatAssetName = (asset) => {
  if (asset === "opWalls") {
    return "Operable Walls";
  } else if (asset === "pcLab") {
    return "PC Lab";
  } else if (asset === "macLab") {
    return "Mac Lab";
  } else if (asset === "tv") {
    return "TV";
  } else if (asset === "whiteBoard") {
    return "Whiteboard";
  } else if (asset === "projector") {
    return "Projector";
  }
};

// Accepts the search date in 'YYYY/MM/DD' format and all of a room's bookings and filters the array for bookings that match the search date
const dailyBookings = (currentDate, roomBookings) => {
  const filteredBookings = roomBookings.filter(
    (
      booking // Check if the booking is for the current date
    ) =>
      localTime(booking.bookingStart).format("YYYY-MM-DD") ===
      momentTimezone(currentDate).format("YYYY-MM-DD")
  );
  return filteredBookings;
};

// A function to take the bookings for a particular room on a given date and insert them into an array which maps each hour of that day
const bookingArray = (filteredBookings) => {
  const localedBookings = filteredBookings.map((booking) => {
     return {
      ...booking,
      bookingStart: localTime(booking.bookingStart),
      bookingEnd: localTime(booking.bookingEnd),
    };
  });
  // An array from 1 to 24 representing each hour of the day
  let dayHours = [...Array(24).keys()];

  localedBookings.forEach((booking) => {
    const startHour = parseFloat(`${booking.bookingStart.format("H")}.${booking.bookingStart.format("mm") / 60 * 10}`), endHour = parseFloat(`${booking.bookingEnd.format("H")}.${booking.bookingEnd.format("mm") / 60 * 10}`)
    const loopStart = Math.floor(startHour), loopEnd = Math.ceil(endHour);

    // Push each booking into the relevant hour in the 24 hour array
    // Loop from the beginning of the start hour to the end of the final hour (rounding half hours)
    for (let i = loopStart; i <= loopEnd; i++) {
      // Create a copy of the booking to customise for each hour
      let bookingData = Object.assign({}, booking);
      if (i + 0.5 > startHour && i + 0.5 <= endHour) {
        bookingData.firstHalfHour = true;
      }
      if (i + 1 > startHour && i + 1 <= endHour) {
        bookingData.secondHalfHour = true;
      }
      // Add the booking object to the relevant hour in the 24 hour array
      // If there is already a booking in that hour, enter the second booking as the second item in an array
      if (bookingData.firstHalfHour || bookingData.secondHalfHour) {
        dayHours[i] =
          typeof dayHours[i] == "number"
            ? bookingData
            : [dayHours[i], bookingData];
      }

    }
  });

  // Return the 24 hour array with all booking objects added to each hour they apply to
  return dayHours;
};

export { formatAssetName, dailyBookings, bookingArray };
