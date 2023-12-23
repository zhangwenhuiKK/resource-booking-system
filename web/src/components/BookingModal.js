import React from "react";
import ReactModal from "react-modal";
import Button from "./Button";
import {
  findRoomInfo,
  findDisplayNameofParam,
} from "../helpers/bookingForm.js";
import { localTime } from "../helpers/common";
import { Modal } from "antd";
const { confirm } = Modal;

const BookingModal = (props) => {
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
  const onConfirmDelete = () => {
    confirm({
      title: "Are you sure to delete the booking?",
      onOk() {
        deleteBooking();
      },
    });
  };
  const roomInfo = findRoomInfo(
    props.selectedBooking?.roomId,
    props.roomData || []
  );
  const renderOtherParams = () => {
    return (props.selectedBooking.params || []).map((param) => {
      const name = findDisplayNameofParam(param.field, roomInfo);
      return (
        <p className="modal__paragraph">
          <span className="form__item__name">{name} </span>
          <span className="form__item__value">{param.value}</span>
        </p>
      );
    });
  };
  const displayDuration = () => {
    const startDay = localTime(props.selectedBooking.bookingStart),
      endDay = localTime(props.selectedBooking.bookingEnd);
    return `${startDay.format("MMM D, YYYY")} ${startDay.format(
      "hh:mma"
    )} - ${endDay.format("hh:mma")}`;
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
            <strong className="modal__paragraph">{roomInfo?.name}</strong>
            <p className="modal__paragraph">
              <span className="form__item__name">Duration</span>
              <span className="form__item__value">{displayDuration()}</span>
            </p>
            <p className="modal__paragraph">
              <span className="form__item__name">Creator </span>
              <span className="form__item__value">{`${props.selectedBooking["firstName"]} ${props.selectedBooking["lastName"]}`}</span>
            </p>
            <p className="modal__paragraph">
              <span className="form__item__name">Email </span>
              <span className="form__item__value">
                {props.selectedBooking["email"]}
              </span>
            </p>
            <p className="modal__paragraph">
              <span className="form__item__name">Group </span>
              <span className="form__item__value">
                {props.selectedBooking["group"]}
              </span>
            </p>
            {renderOtherParams()}
            {/* <p className="modal__paragraph">
              <span>Purpose:</span>
              {props.selectedBooking["purpose"]}
            </p>
            <p className="modal__paragraph">
              <span>Description </span>
              {props.selectedBooking["description"]}
            </p> */}
          </div>
          <div className="modal__footer">
            <a
              href={`mailto:${props.selectedBooking.email}`}
              className="button"
            >
              Contact
            </a>

            {props.user.email === props.selectedBooking.email && (
              <>
                {!props.disableEditButton && (
                  <Button onClick={editBooking} text={`Edit`} />
                )}
                {!props.disableDeleteButton && (
                  <Button onClick={onConfirmDelete} text={`Delete`} />
                )}
              </>
            )}

            <Button
              className="button__close button--alternative"
              onClick={props.onCloseBooking}
              text={`Close`}
            />
          </div>
        </ReactModal>
      )}
    </React.Fragment>
  );
};
export default BookingModal;
