import React, { Fragment, useMemo, useState } from "react";
import BookingFormTable from "./BookingFormTable";
import Calendar from "./Calendar";
import moment from "moment";
import momentTimezone from "moment-timezone";
import { Link, useSearchParams } from "react-router-dom";
import Button from "./Button";
import {
  formatTime,
  startTimeSelectOptions,
  endTimeSelectOptions,
} from "../helpers/bookingForm";
import ConfirmationModal from "./ConfirmationModal";

function BookingForm({
  onEditBooking,
  onMakeBooking,
  user,
  roomData,
  selectedBooking,
  date,
  updateCalendar,
  onShowBooking,
  disableRecurring,
  onToggleRecurring,
}) {
  const editingMode = window.history.state?.usr?.editingMode;
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [tempFormData, setTempFormData] = useState();

  //Read values from booking details if in editing mode
  const defaultValues = useMemo(() => {
    let res;
    if (editingMode) {
      res = {
        startTime: `${momentTimezone
          .tz(selectedBooking["bookingStart"], "Europe/Brussels").local()
          .format("HH:mm")}`,
        endTime: `${momentTimezone
          .tz(selectedBooking["bookingEnd"], "Europe/Brussels").local()
          .format("HH:mm")}`,
        group: selectedBooking.group,
      };
      (selectedBooking.params || []).forEach((p) => {
        res[p.field] = p.value;
      });
    }
    return res;
  }, [selectedBooking]);

  const onSaveBooking = (formData) => {
    setIsConfirmationModalOpen(false);
    // Extract date array from current date in state
    const dateArray = moment(date)
      .format("Y M D")
      .split(" ")
      .map((item) => parseInt(item, 10));
    dateArray[1] = dateArray[1] - 1;
    // Data from input
    const //formData = event.target.elements,
      roomId = roomData._id,
      instrumentParams = roomData.params || [];
    // startDate data
    const startTime = formatTime(formData.startTime.value);
    const startDate = [...dateArray, ...startTime];
    // endDate data
    const endTime = formatTime(formData.endTime.value);
    const endDate = [...dateArray, ...endTime];
    // Booking specifics
    const group = formData.group.value;
    let recurringEnd = handleEndDate(
      formData.recurringEndDate?.value?.split("-")
    );
    const recurringType = formData?.recurring?.value || "none";
    let recurringData = handleRecurringData(recurringType, recurringEnd);
    const purpose = formData.purpose?.value;
    const description = formData.description?.value;
    //more params
    const otherParams = [];
    instrumentParams.forEach((param) => {
      const field = param?.field;
      if (formData[field]?.value) {
        otherParams.push({
          field,
          value: formData[field]?.value,
        });
      }
    });
    //
    editingMode
      ? onEditBooking({
          bookingId: selectedBooking._id,
          startDate,
          endDate,
          group,
          purpose,
          roomId,
          recurringData,
          params: otherParams,
        })
      : onMakeBooking({
          startDate,
          endDate,
          group,
          purpose,
          roomId,
          recurringData,
          params: otherParams,
        });
  };
  const handleEndDate = (dateArray) => {
    let recurringEndDate = [];
    if (Array.isArray(dateArray)) {
      dateArray.forEach((item) => {
        recurringEndDate.push(parseInt(item));
      });
    }
    return recurringEndDate;
  };

  // Format the recurring data into an array
  const handleRecurringData = (type, date) => {
    let recurringData = [];
    if (type !== "none") {
      recurringData = [date, type];
      recurringData[0][1] = recurringData[0][1] - 1;
    } else {
      recurringData = [];
    }
    return recurringData;
  };

  // Array used for handleData function
  let dateArray = [];

  // Update the current date in the application state
  const handleDate = (event) => {
    updateCalendar(moment(event)._i);
  };
  const renderMoreDetails = () => {
    return (roomData.params || []).map((param) => {
      return (
        <div className="form__group">
          <label className="form__label form__label--booking">
            {param.name}
            <input
              name={param.field}
              type="text"
              className="form__input--text"
              defaultValue={defaultValues?.[param.field]}
            />
          </label>
        </div>
      );
    });
  };
  return (
    <Fragment>
      <div className="header__page">
        <h2 className="header__heading header__heading--sub">
          {roomData.name}
        </h2>
      </div>
      <div className="main__content">
        <div className="sidebar">
          <Calendar setCalendarDate={handleDate} date={date} />
        </div>
        <div className="content">
          <div className="content__table">
            <BookingFormTable
              roomData={roomData}
              date={date}
              onShowBooking={onShowBooking}
            />
          </div>
          <form
            className="content__form"
            onSubmit={(event) => {
              event.preventDefault();
              if (roomData.description) {
                setTempFormData(event.target.elements);
                setIsConfirmationModalOpen(true);
              } else {
                onSaveBooking(event.target.elements);
              }
            }}
          >
            <h3 className="header__heading header__heading--column making__booking__form__header">
              {/* Make a Booking */}
              {`${editingMode ? "Edit" : "Make"} a Booking`}
            </h3>

            <div className="form__group form__group--margin-top">
              <label className="form__label form__label--booking">
                {"Start time"}
                <select
                  name="startTime"
                  className="form__input form__input--select"
                  defaultValue={defaultValues?.startTime}
                >
                  {startTimeSelectOptions.map((option) => {
                    return option;
                  })}
                </select>
              </label>
            </div>
            <div className="form__group">
              <label className="form__label form__label--booking">
                {"End time"}
                <select
                  name="endTime"
                  className="form__input form__input--select"
                  defaultValue={defaultValues?.endTime}
                >
                  {endTimeSelectOptions.map((option) => {
                    return option;
                  })}
                </select>
              </label>
            </div>

            <div className="form__group">
              <label className="form__label form__label--booking">
                {"Group"}
                <select
                  name="group"
                  className="form__input form__input--select"
                  defaultValue={defaultValues?.group}
                >
                  <option value="MNS">MNS</option>
                  <option value="cMACS">cMACS</option>
                  <option value="Micas">Micas</option>
                  <option value="Biomechanics">Biomechanics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="LBM">LBM</option>
                  <option value="MAPS">MAPS</option>
                  <option value="Physics">Physics</option>
                  <option value="Nerf">Nerf</option>
                  <option value="SMaRT">SMaRT</option>
                  <option value="Uhasselt">Uhasselt</option>
                  <option value="WaveCore">WaveCore</option>
                  <option value="Mebios">Mebios</option>
                  <option value="Others">Others</option>
                </select>
              </label>
            </div>
            {/* <div className="form__group">
              <label className="form__label form__label--booking">
                {"Email"}
                <input
                  name="emial"
                  type="text"
                  defaultValue={user.email}
                  disabled
                  className="form__input--text"
                />
              </label>
            </div>
            <div className="form__group">
              <label className="form__label form__label--booking">
                {"Name"}
                <input
                  name="name"
                  type="text"
                  className="form__input--text"
                  disabled
                  value={`${user.firstName} ${user.lastName}`}
                />
              </label>
            </div> */}
            {/* <div className="form__group">
              <label className="form__label form__label--booking">
                {"Recurring"}
                <span>
                  <select
                    name="recurring"
                    defaultValue="none"
                    onChange={(event) => onToggleRecurring(event.target.value)}
                    className="form__input form__input--select"
                  >
                    <option value="none">Non recurring</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </span>
              </label>
            </div>
            <label className="form__label form__label--booking">
              {"Recurring end date"}
              <input
                type="date"
                name="recurringEndDate"
                disabled={disableRecurring}
                className="form__input--date"
              />
            </label> 
            <div className="form__group">
              <label className="form__label form__label--booking">
                {"Purpose"}
                <select
                  name="purpose"
                  defaultValue="Scheduled class"
                  className="form__input form__input--select"
                >
                  <option value="Scheduled Class">Scheduled class</option>
                  <option value="Special Event">Special event</option>
                  <option value="Ad-hoc Event">Ad-hoc event</option>
                </select>
              </label>
            </div> */}
            {/* <div className="form__group">
              <label className="form__label form__label--booking">
                {"Description"}
                <textarea
                  type="textarea"
                  name="description"
                  className="form__input--textarea"
                ></textarea>
              </label>
            </div> */}
            {renderMoreDetails()}
            <div className="form__group--button">
              <Button
                className="button button__form--booking"
                text={"Submit"}
              />
              <Link
                to="/bookings"
                className="button button--alternative button__form--booking"
              >
                View availability
              </Link>
            </div>
          </form>
        </div>
      </div>
      <ConfirmationModal
        isModalOpen={isConfirmationModalOpen}
        onCloseConfirmation={() => setIsConfirmationModalOpen(false)}
        onConfirm={() => onSaveBooking(tempFormData)}
        content={roomData.description}
      />
    </Fragment>
  );
}

export default BookingForm;
