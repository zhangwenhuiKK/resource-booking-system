import React from "react";
import ReactModal from "react-modal";
// import {  Modal } from "antd";
import momentTimezone from "moment-timezone";
import Button from "./Button";
import {
  findRoomInfo,
  findDisplayNameofParam,
} from "../helpers/bookingForm.js";

const BookingModal = (props) => {
  const deleteBooking = () => {
    const roomID = props.selectedBooking.roomId;
    const bookingID = props.selectedBooking._id;
    props.onDeleteBooking(roomID, bookingID);
    props.onCloseBooking();
  };
  const editBooking = () => {
    const roomID = props.selectedBooking.roomId;
    const bookingID = props.selectedBooking._id;
    props.onEditBooking(props.selectedBooking);
    props.onCloseBooking();
  };
  const roomInfo = findRoomInfo(props.selectedBooking?.roomId, props.roomData);
  const renderOtherParams = () => {
    return (props.selectedBooking.params || []).map((param) => {
      const name = findDisplayNameofParam(param.field, roomInfo);
      return (
        <p className="modal__paragraph">
          <strong>{name} </strong>
          {param.value}
        </p>
      );
    });
  };
  return (
    <React.Fragment>
      {props.isModalOpen && (
        <ReactModal
          isOpen={true}
          onRequestClose={props.onCloseBooking}
          ariaHideApp={true}
          shouldFocusAfterRender={true}
          shouldReturnFocusAfterClose={true}
          contentLabel="Booking"
          appElement={document.getElementById("app")}
          closeTimeoutMS={200}
          className="modal"
        >
          <h3 className="modal__title">Booking Details</h3>
          <div className="modal__boday">
            <p className="modal__paragraph">{roomInfo?.name}</p>
            <p className="modal__paragraph">
              {`${momentTimezone
                .tz(props.selectedBooking["bookingStart"], "Asia/Shanghai")
                .format("MMM D, YYYY hh:mma")} to ${momentTimezone
                .tz(props.selectedBooking["bookingEnd"], "Asia/Shanghai")
                .format("MMM D, YYYY hh:mma")}`}
              {/* <p className="modal__paragraph">
                {`${momentTimezone
                  .tz(props.selectedBooking["bookingStart"], "Asia/Shanghai")
                  .format("MMMM Do, YYYY")} to ${momentTimezone
                  .tz(props.selectedBooking["bookingEnd"], "Asia/Shanghai")
                  .format("MMMM Do, YYYY")}`}
              </p> */}
            </p>
            <p className="modal__paragraph">
              <strong>Creator </strong>
              {`${props.selectedBooking["firstName"]} ${props.selectedBooking["lastName"]}`}
            </p>
            <p className="modal__paragraph">
              <strong>Email </strong>
              {props.selectedBooking["email"]}
            </p>
            <p className="modal__paragraph">
              <strong>Group </strong>
              {props.selectedBooking["group"]}
            </p>
            {renderOtherParams()}
            {/* <p className="modal__paragraph">
              <strong>Purpose:</strong>
              {props.selectedBooking["purpose"]}
            </p>
            <p className="modal__paragraph">
              <strong>Description </strong>
              {props.selectedBooking["description"]}
            </p> */}
          </div>

          <a href={`mailto:${props.selectedBooking.email}`} className="button">
            Contact
          </a>

          <Button onClick={editBooking} text={`Edit`} />
          <Button onClick={deleteBooking} text={`Delete`} />

          <Button
            className="button__close button--alternative"
            onClick={props.onCloseBooking}
            text={`Close`}
          />
        </ReactModal>
      )}
    </React.Fragment>
  );
};
export default BookingModal;
