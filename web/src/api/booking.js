import momentTimezone from "moment-timezone";
import api from "./init";

// Function to receive booking data (CET) and convert to JS Date object
// Data expected in [year, month, date, hours, seconds] format
const dateUTC = (dataArray) => {
  // Ensure date data is saved in CET and then converted to a Date object
  return momentTimezone(dataArray).utc().toDate();
};

// Make a room booking
export function makeBooking(data, existingBookings) {
  // Convert booking data to Date objects
  let bookingStart = dateUTC(data.startDate);
  let bookingEnd = dateUTC(data.endDate);
  // Convert booking Date objects into a number value
  let newBookingStart = bookingStart.getTime();
  let newBookingEnd = bookingEnd.getTime();

  // Check whether the new booking times overlap with any of the existing bookings
  let bookingClash = false;

  existingBookings.forEach((booking) => {
    // Convert existing booking Date objects into number values
    let existingBookingStart = new Date(booking.bookingStart).getTime();
    let existingBookingEnd = new Date(booking.bookingEnd).getTime();

    // Check whether there is a clash between the new booking and the existing booking
    if (
      (newBookingStart >= existingBookingStart &&
        newBookingStart < existingBookingEnd) ||
      (existingBookingStart >= newBookingStart &&
        existingBookingStart < newBookingEnd)
    ) {
      // Switch the bookingClash variable if there is a clash
      return (bookingClash = true);
    }
  });

  // Ensure the new booking is valid (i.e. the start time is before the end time, and the booking is for a future time)
  let validDate =
    newBookingStart < newBookingEnd && newBookingStart > new Date().getTime();

  // If a recurring booking as been selected, ensure the end date is after the start date
  let validRecurring =
    data.recurringData.length > 0
      ? dateUTC(data.recurringData[0]).getTime() > newBookingEnd
      : true;

  // Save the booking to the database and return the booking if there are no clashes and the new booking time is not in the past
  if (!bookingClash && validDate && validRecurring) {
    return api
      .put(`/rooms/${data.roomId}`, {
        bookingStart: bookingStart,
        bookingEnd: bookingEnd,
        group: data.group,
        purpose: data.purpose,
        roomId: data.roomId,
        recurring: data.recurringData,
        params: data.params,
      })
      .then((res) => res.data)
      .catch((err) => alert(err));
  }
}

export function editBooking(data, existingBookings) {
  // Convert booking data to UTC Date objects
  let bookingStart = dateUTC(data.startDate);
  let bookingEnd = dateUTC(data.endDate);

  // Convert booking Date objects into a number value
  let newBookingStart = bookingStart.getTime();
  let newBookingEnd = bookingEnd.getTime();

  // Check whether the new booking times overlap with any of the existing bookings
  let bookingClash = false;

  existingBookings.forEach((booking) => {
    // Convert existing booking Date objects into number values
    let existingBookingStart = new Date(booking.bookingStart).getTime();
    let existingBookingEnd = new Date(booking.bookingEnd).getTime();

    // Check whether there is a clash between the new booking and the existing booking
    if (
      (newBookingStart >= existingBookingStart &&
        newBookingStart < existingBookingEnd) ||
      (existingBookingStart >= newBookingStart &&
        existingBookingStart < newBookingEnd)
    ) {
      // Switch the bookingClash variable if there is a clash
      return (bookingClash = true);
    }
  });

  // Ensure the new booking is valid (i.e. the start time is before the end time, and the booking is for a future time)
  let validDate =
    newBookingStart < newBookingEnd && newBookingStart > new Date().getTime();

  // If a recurring booking as been selected, ensure the end date is after the start date
  let validRecurring =
    data.recurringData.length > 0
      ? dateUTC(data.recurringData[0]).getTime() > newBookingEnd
      : true;

  // Save the booking to the database and return the booking if there are no clashes and the new booking time is not in the past
  if (!bookingClash && validDate && validRecurring) {
    return api
      .put(`/rooms/edit/${data.roomId}/${data.bookingId}`, {
        bookingStart: bookingStart, //will be saved as utc time
        bookingEnd: bookingEnd,
        group: data.group,
        purpose: data.purpose,
        roomId: data.roomId,
        recurring: data.recurringData,
        params: data.params,
      })
      .then((res) => res.data)
      .catch((err) => alert(err));
  }
}

// Delete a room booking
export function deleteBooking(roomId, bookingId) {
  return api.delete(`/rooms/${roomId}/${bookingId}`).then((res) => res.data);
}

export function updateStateRoom(self, updatedRoom, loadMyBookings) {
  self.setState((previousState) => {
    // Find the relevant room in React State and replace it with the new room data
    const updatedRoomData = previousState.roomData.map((room) => {
      if (room._id === updatedRoom._id) {
        return updatedRoom;
      } else {
        return room;
      }
    });
    return {
      // Update the room data in application state
      roomData: updatedRoomData,
      currentRoom: updatedRoom,
    };
  });
  loadMyBookings();
}
