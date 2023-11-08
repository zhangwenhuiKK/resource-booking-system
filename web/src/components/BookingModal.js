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
  const editingMode = window.history.state?.usr?.editingMode;
  const deleteBooking = () => {
    const roomID = props.selectedBooking.roomId;
    const bookingID = props.selectedBooking._id;
    props.onDeleteBooking(roomID, bookingID);
    props.onCloseBooking();
  };
  const editBooking = () => {
    props.onEditBooking(props.selectedBooking);
    props.onCloseBooking();
  };
  const roomInfo = findRoomInfo(props.selectedBooking?.roomId, props.roomData);
  const renderOtherParams = () => {
    return (props.selectedBooking.params || []).map((param) => {
      const name = findDisplayNameofParam(param.field, roomInfo);
      return (
        <p className="modal__paragraph">
          <strong className="form__item__name">{name} </strong>
          <span className="form__item__value">{param.value}</span>
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
          <div className="modal__body">
            <p className="modal__paragraph">{roomInfo?.name}</p>
            <p className="modal__paragraph">
              {`${momentTimezone
                .tz(props.selectedBooking["bookingStart"], "Europe/Brussels").local()
                .format("MMM D, YYYY hh:mma")} to ${momentTimezone
                  .tz(props.selectedBooking["bookingEnd"], "Europe/Brussels").local()
                  .format("MMM D, YYYY hh:mma")}`}
            </p>
            <p className="modal__paragraph">
              <strong  className="form__item__name">Creator </strong>
              <span className="form__item__value">{`${props.selectedBooking["firstName"]} ${props.selectedBooking["lastName"]}`}</span>
            </p>
            <p className="modal__paragraph">
              <strong className="form__item__name">Email </strong>
              <span className="form__item__value">{props.selectedBooking["email"]}</span>
            </p>
            <p className="modal__paragraph">
              <strong className="form__item__name">Group </strong>
              <span className="form__item__value">{props.selectedBooking["group"]}</span>
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

          {!editingMode && <><Button onClick={editBooking} text={`Edit`} />
            <Button onClick={deleteBooking} text={`Delete`} /></>}

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
