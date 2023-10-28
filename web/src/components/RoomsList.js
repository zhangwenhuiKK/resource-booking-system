import React from "react";
import RoomRow from "./RoomRow";
import { roomSorter } from "../helpers/sorter";
const CATEGORIES = [
  "Clean Room",
  "Mask Making",
  "Thin Film Deposition",
  "Oven",
  "Etching",
  "Mechanical Inspection",
  "Electrical Inspection",
  "Actuator Lab",
];

const RoomsList = (props) => {
  const validCategories =
    props.categoryParam === "all" ? CATEGORIES : [props.categoryParam];
  return (
    <table className="table">
      {validCategories.map((category) => {
        return (
          <>
            <tr className="table__row table__row--header">
              <th
                scope="colgroup"
                colSpan="15"
                className="table__cell--header table__cell--level table__cell--align-left"
              >
                {category}
              </th>
            </tr>
            <tr className="table__row table__row--subheader">
              <th
                scope="col"
                className="table__cell--header  table__cell--width table__cell--align-left"
              >
                {category === "Clean Room" ? "Room Slots" : "Instruments"}
              </th>
              <th scope="col" className="table__cell--header">
                8am
              </th>
              <th scope="col" className="table__cell--header">
                9am
              </th>
              <th scope="col" className="table__cell--header">
                10am
              </th>
              <th scope="col" className="table__cell--header">
                11am
              </th>
              <th scope="col" className="table__cell--header">
                12pm
              </th>
              <th scope="col" className="table__cell--header">
                1pm
              </th>
              <th scope="col" className="table__cell--header">
                2pm
              </th>
              <th scope="col" className="table__cell--header">
                3pm
              </th>
              <th scope="col" className="table__cell--header">
                4pm
              </th>
              <th scope="col" className="table__cell--header">
                5pm
              </th>
              <th scope="col" className="table__cell--header">
                6pm
              </th>
              <th scope="col" className="table__cell--header">
                7pm
              </th>
              <th scope="col" className="table__cell--header">
                8pm
              </th>
            </tr>
            <tbody className="table__body">
              {props.rooms &&
                roomSorter(props.rooms, category).map((room) => (
                  <RoomRow
                    key={room._id}
                    room={room}
                    bookings={room.bookings}
                    date={props.date === null ? new Date() : props.date}
                    onShowBooking={props.onShowBooking}
                    onSetRoom={props.onSetRoom}
                  />
                ))}
            </tbody>
          </>
        );
      })}
    </table>
  );
};

export default RoomsList;
