import React, {
  Component,
  Fragment,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import "./css/style.css";
import moment from "moment";

import BookingForm from "./components/BookingForm";
import Button from "./components/Button";
import FilterElement from "./components/FilterElement";
import Footer from "./components/Footer";
import Key from "./components/Key";
import MyBookings from "./components/MyBookings";
import NavBar from "./components/NavBar";
import RoomsList from "./components/RoomsList";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";

import { signIn, signOut, signUp } from "./api/auth";
import { listRooms } from "./api/rooms";
import { getDecodedToken } from "./api/token";
import { makeBooking, deleteBooking, editBooking } from "./api/booking";
import Calendar from "./components/Calendar";
import BookingModal from "./components/BookingModal";
import {
  CategoryParams,
  FilterParams,
  CapacityParams,
  onFilterByCategory,
  onFilterByFeature,
  onFilterByCapacity,
  onFilterByAvailablity,
} from "./helpers/filters";
import { initialRoom } from "./helpers/rooms";

function App() {
  const STORED_DATA = JSON.parse(
    window.localStorage.getItem("booking_data") || "{}"
  );
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [decodedToken, setDecodedToken] = useState(getDecodedToken());
  const [roomData, setRoomData] = useState([]);
  const [calendarDate, setCalendarDate] = useState(
    STORED_DATA?.calendarDate || new Date()
  );
  const [selectedBooking, setSelectedBooking] = useState(
    STORED_DATA?.selectedBooking || null
  );
  const [filterParams, setFilterParams] = useState(FilterParams);
  const [capacityParams, setCapacityParams] = useState(CapacityParams);
  const [categoryParam, setCategoryParam] = useState("all");
  const [availabilityParam, setAvailabilityParam] = useState(null);
  const [currentRoom, setCurrentRoomm] = useState(
    STORED_DATA?.currentRoom || null
  );
  const [disableRecurring, setDisableRecurring] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userBookings = useMemo(() => {
    let myBookings = [];
    const userId = decodedToken?.sub;
    // Loop through all the rooms
    roomData.forEach((room) => {
      // Loop through all the bookings in 'room'
      room.bookings.forEach((booking) => {
        if (booking.user === userId) {
          // Push all bookings where the current userId is equal to the booking's userId into myBookings
          booking.roomId = room._id;
          myBookings.push(booking);
        }
      });
    });
    return myBookings;
  }, [roomData, decodedToken]);

  // Pass supplied first name, lastname, email & password to the signUp function, returns the user's token
  const onSignUp = ({ firstName, lastName, email, password }) => {
    signUp({ firstName, lastName, email, password }).then((decodedToken) => {
      setDecodedToken(decodedToken);
    });
  };

  // Pass supplied email & password to the signIn function, returns the users token
  const onSignIn = ({ email, password }) => {
    signIn({ email, password }).then((decodedToken) => {
      setDecodedToken(decodedToken);
    });
  };

  // Removes the current token from local storage
  const onSignOut = () => {
    signOut();
    window.localStorage.setItem("booking_data", null);
    setDecodedToken(null);
  };

  //  const setCalendarDate = (date) => {
  //     this.setState({ calendarDate: date });
  //   };

  const onShowBooking = (booking) => {
    // const selectedBooking = booking;
    console.log("selectedBooking", booking);
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const onCloseBooking = () => {
    setIsModalOpen(false);
    // setSelectedBooking(null);
  };

  const updateStateRoom = (updatedRoom) => {
    // Find the relevant room in React State and replace it with the new room data
    const updatedRoomData = roomData.map((room) => {
      if (room._id === updatedRoom._id) {
        return updatedRoom;
      } else {
        return room;
      }
    });
    const updatedSelectedBooking = updatedRoom?.bookings?.find(
      (b) =>
        b.roomId === selectedBooking.roomId && b._id === selectedBooking?._id
    );
    setSelectedBooking(updatedSelectedBooking);
    setRoomData(updatedRoomData);
    setCurrentRoomm(updatedRoom);
    //loadMyBookings();
  };

  // Makes a booking by updating the database and the React state
  const onMakeBooking = ({
    startDate,
    endDate,
    group,
    purpose,
    roomId,
    recurringData,
    params,
  }) => {
    const bookingData = { startDate, endDate, group, purpose, roomId };
    const existingBookings = currentRoom.bookings;

    // Check if there is a clash and, if not, save the new booking to the database
    try {
      makeBooking(
        {
          startDate,
          endDate,
          group,
          purpose,
          roomId,
          recurringData,
          params,
        },
        existingBookings
      ).then((updatedRoom) => {
        // If the new booking is successfully saved to the database
        alert(`${updatedRoom.name} successfully booked.`);
        updateStateRoom(updatedRoom);
      });
    } catch (err) {
      // If there is a booking clash and the booking could not be saved
      alert(
        "Your booking could not be saved. Please ensure it does not clash with an existing booking and that it is a valid time in the future."
      );
      console.log(err);
    }
  };

  // Deletes a booking from the database and updates the React state
  const onDeleteBooking = (roomId, bookingId) => {
    deleteBooking(roomId, bookingId)
      .then((updatedRoom) => {
        alert("Booking successfully deleted");
        updateStateRoom(updatedRoom);
      })
      .catch((error) => console.error(error.message));
  };
  // Edit a booking from the database and updates the React state
  const onEditBooking = ({
    bookingId,
    startDate,
    endDate,
    group,
    purpose,
    roomId,
    recurringData,
    params,
  }) => {
    const otherBookings = currentRoom.bookings.filter(
      (booking) => booking._id !== bookingId
    );
    // Check if there is a clash and, if not, save the new booking to the database
    try {
      editBooking(
        {
          bookingId,
          startDate,
          endDate,
          group,
          purpose,
          roomId,
          recurringData,
          params,
        },
        otherBookings
      ).then((updatedRoom) => {
        // If the new booking is successfully saved to the database
        alert(
          updatedRoom?.name
            ? updatedRoom.name + "successfully updated"
            : "Failed to update booking"
        );
        updateStateRoom(updatedRoom);
      });
    } catch (err) {
      // If there is a booking clash and the booking could not be saved
      alert(
        "Your booking could not be saved. Please ensure it does not clash with an existing booking and that it is a valid time in the future."
      );
      console.log(err);
    }
  };
  //Navigate to Booking Form
  const onJumpToBookingForm = (selectedBooking) => {
    setRoom(selectedBooking.roomId);
    navigate("/createbooking", { state: { editingMode: true } });
  };

  const setRoom = (id) => {
    const room = roomData.find((room) => room._id === id);
    setCurrentRoomm(room);
  };

  // setting the feature filter parameters
  const onToggleFeature = (feature) => {
    // Get the filter parameters
    //let filterParams =  filterParams;
    // Find the filter parameter that matches the the passed parameter
    let featureParam = filterParams.find((param) => param.name === feature);
    // Toggle the value of the parameter, eg if false, set to true
    featureParam.value = !featureParam.value;
    // Set state with the updated filter parameters
    setFilterParams(filterParams);
  };

  // setting the capacity filter parameters
  const onToggleCapacity = (capacity) => {
    // Get the capacity parameters
    // let capacityParams = capacityParams;
    // Find the capacity parameter that matches the the passed parameter
    let capacityParam = capacityParams.find((param) => param.id === capacity);
    // Toggle the value of the parameter, eg if false, set to true
    capacityParam.value = !capacityParam.value;
    // Set state with the updated capacity parameters
    setCapacityParams(capacityParams);
  };

  // changing the boolean value for the display attribute for the recurring date input
  const onToggleRecurring = (value) => {
    let disableRecurring;
    if (value === "none") {
      disableRecurring = true;
    } else {
      disableRecurring = false;
    }
    setDisableRecurring(disableRecurring);
  };

  const onSetCategoryParam = (value) => {
    setCategoryParam(value);
  };

  const onSetAvailabilityParam = (availability) => {
    setAvailabilityParam(availability);
  };

  // get today's bookings for all rooms
  const oneSetCurrentDateBookings = () => {
    const currentDate = moment().format("DD-MM-YYYY");
    // const roomData = this.state.roomData
    // const roomData = this.state.roomData;
    // array to collect todays bookings
    let todaysBookings = [];
    // loop through all rooms
    roomData.forEach((room) => {
      // loop through all bookings for that room
      room.bookings.forEach((booking) => {
        const bookingStart = moment(booking.bookingStart).format("DD-MM-YYYY");
        if (bookingStart === currentDate) {
          todaysBookings.push(booking);
        }
      });
    });
    console.log("todays bookings:", todaysBookings);
    // return todaysBookings
  };

  // const loadMyBookings = () => {
  //   return userBookings;
  // };

  const signedIn = !!decodedToken;
  //const signOut = onSignOut;
  let filteredData = [];
  //const featureParams = filterParams;
  //const date = currentDate;

  if (!!roomData) {
    // Send all room data and the selected floor, return filtered floors and store in filteredData
    filteredData = onFilterByCategory(categoryParam, roomData);
    // Send the previously filtered data along with the feature params
    //filteredData = onFilterByFeature(featureParams, filteredData);
    // Send the previously filtered data along with the capacity params
    //filteredData = onFilterByCapacity(capacityParams, filteredData);
    // Send the previously filtered data along with the availability
    //filteredData = onFilterByAvailablity(availabilityParam, filteredData);
  }
  const requireAuth = (Comp) => (signedIn ? <Comp /> : <Navigate to="/" />);
  const LandingPage = () => {
    return signedIn ? (
      <Navigate to="/bookings" />
    ) : (
      <div className="wrapper__form">
        <div className="header__page">
          <h2 className="header__heading header__heading--sub--alt">
            Sign in with email
          </h2>
        </div>
        <SignInForm onSignIn={onSignIn} />
        <h3 className="header__heading header__heading--sub--alt">
          Don't have an account?
        </h3>
        <SignUpForm onSignUp={onSignUp} />
      </div>
    );
  };

  const BookingPage = () => (
    <Fragment>
      {!!decodedToken && !roomData && loading && (
        <div className="loading_animation">
          {/* <Loading /> */}
          Loading...
        </div>
      )}
      {!!decodedToken && !!roomData && !loading && (
        <div className="wrapper">
          <div className="header header__nav header--flex">
            <h1 className="header__heading header__heading--main">
              Company Name Here
            </h1>
            <NavBar
              signOut={onSignOut}
              // loadMyBookings={loadMyBookings}
              user={signedIn ? decodedToken.sub : null}
            />
          </div>
          <div className="wrapper__content">
            <div className="header__page">
              <h2 className="header__heading header__heading--sub">
                {moment(calendarDate).format("MMMM Do YYYY")}
              </h2>
            </div>
            <div className="main__content">
              <div className="sidebar">
                <div className="sidebar__box">
                  <Calendar
                    setCalendarDate={setCalendarDate}
                    date={calendarDate}
                  />
                </div>
                <div className="sidebar__box">
                  <FilterElement
                    onSetCategoryParam={onSetCategoryParam}
                    onToggleFeature={onToggleFeature}
                    onToggleCapacity={onToggleCapacity}
                    onSetAvailabilityParam={onSetAvailabilityParam}
                    filterParams={filterParams}
                    capacityParams={capacityParams}
                    categoryParam={categoryParam}
                    availabilityParam={availabilityParam}
                    // onSetTimeFilterParams={onSetTimeFilterParams}
                    date={calendarDate}
                  />
                </div>
                <div className="sidebar__box">
                  <Key />
                </div>
              </div>
              <div className="content">
                <RoomsList
                  categoryParam={categoryParam}
                  rooms={filteredData}
                  // onRoomSelect={onRoomSelect}
                  onShowBooking={onShowBooking}
                  date={calendarDate}
                  onSetRoom={setRoom}
                />
              </div>
            </div>
          </div>
          <BookingModal
            isModalOpen={isModalOpen}
            selectedBooking={selectedBooking}
            onCloseBooking={onCloseBooking}
            onEditBooking={onJumpToBookingForm}
            onDeleteBooking={onDeleteBooking}
            roomData={roomData}
            user={decodedToken}
          />
        </div>
      )}
    </Fragment>
  );

  const CreateBooking = () => (
    <Fragment>
      {!!decodedToken && !!roomData && !!currentRoom && (
        <div className="wrapper">
          <header className="header header__nav header--flex">
            <h1 className="header__heading header__heading--main">
              Company Name Here
            </h1>
            <NavBar
              signOut={onSignOut}
              // loadMyBookings={loadMyBookings}
              user={signedIn ? decodedToken.sub : null}
            />
          </header>
          <div className="wrapper__content">
            <BookingForm
              user={decodedToken}
              roomData={currentRoom}
              selectedBooking={selectedBooking}
              onMakeBooking={onMakeBooking}
              onEditBooking={onEditBooking}
              date={calendarDate}
              disableRecurring={disableRecurring}
              updateCalendar={setCalendarDate}
              onShowBooking={onShowBooking}
              onToggleRecurring={onToggleRecurring}
            />
          </div>
          <BookingModal
            isModalOpen={isModalOpen}
            selectedBooking={selectedBooking}
            onCloseBooking={onCloseBooking}
            onDeleteBooking={onDeleteBooking}
            onEditBooking={onJumpToBookingForm} //Click Edit will jump to Booking Form with values
            roomData={roomData}
            user={decodedToken}
          />
        </div>
      )}
    </Fragment>
  );
  const MyBooking = () => (
    <Fragment>
      {!!decodedToken && !!roomData && (
        <div className="wrapper">
          <div className="header header__nav header--flex">
            <h1 className="header__heading header__heading--main">
              Company Name Here
            </h1>
            <NavBar
              signOut={onSignOut}
              //loadMyBookings={loadMyBookings}
              user={signedIn ? decodedToken.sub : null}
            />
          </div>
          <div className="wrapper__content--bookings">
            <div className="header__page">
              <h2 className="header__heading header__heading--sub">
                My Bookings
              </h2>
            </div>
            <MyBookings
              roomData={roomData}
              user={decodedToken.email}
              userBookings={userBookings}
              onDeleteBooking={onDeleteBooking}
            />
          </div>
        </div>
      )}
    </Fragment>
  );

  useEffect(() => {
    const load = () => {
      // const { decodedToken } = this.state;
      //  const signedIn = !!decodedToken;
      if (signedIn) {
        // display loading page
        setLoading(true);
        // load all of the rooms from the database
        listRooms()
          .then((rooms) => {
            setRoomData(rooms);
            // load the current user's bookings
            //loadMyBookings();
            // the state's current room defaults to first room
            const room = rooms[0];
            // setRoom(room._id);
            // toggle loading page off
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error loading room data", error);
            //this.setState({ error });
          });
      }
    };
    load();
  }, [signedIn]);

  useEffect(() => {
    window.localStorage.setItem(
      "booking_data",
      JSON.stringify({
        calendarDate,
        currentRoom,
        selectedBooking,
      })
    );
  }, [calendarDate, currentRoom, selectedBooking]);
  //return {
  // const {
  //   decodedToken,
  //   currentRoom,
  //   userBookings,
  //   roomData,
  //   calendarDate,
  //   selectedBooking,
  //   filterParams,
  //   capacityParams,
  //   categoryParam,
  //   availabilityParam,
  //   disableRecurring,
  //   loading,
  // } = this.state;
  // const signedIn = !!decodedToken;
  // const signOut = this.onSignOut;
  // const loadMyBookings = this.loadMyBookings;
  // const onEditBooking = this.onEditBooking;
  // const onDeleteBooking = this.onDeleteBooking;
  // const setCalendarDate = this.setCalendarDate;
  // const Loading = require("react-loading-animation");

  return (
    <div id="app" className="App">
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/bookings" exact element={requireAuth(BookingPage)} />
        <Route
          path="/createbooking"
          exact
          element={requireAuth(CreateBooking)}
        />
        <Route path="/mybookings" exact element={requireAuth(MyBooking)} />
        <Route path="*" element={<h2> Page Not Found </h2>} />
      </Routes>
    </div>
  );
  //}

  // // When the App first renders
  // componentDidMount() {
  //   this.load();
  // }

  // // When state changes
  // componentDidUpdate(prevProps, prevState) {
  //   // If just signed in, signed up, or signed out,
  //   // then the token will have changed
  //   if (this.state.decodedToken !== prevState.decodedToken) {
  //     this.load();
  //   }
  // }
}

export default App;
