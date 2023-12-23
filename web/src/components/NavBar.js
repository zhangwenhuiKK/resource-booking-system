import React from "react";
import { Link } from "react-router-dom";

function NavBar({
  signOut,
  //loadMyBookings,
  user,
}) {
  return (
    <div className="header header__nav header--flex">
      <h1 className="header__heading header__heading--main">
        MNS Cleanroom Booking System
      </h1>
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <Link to="/bookings" className="nav__link">
              View Resource Availability
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/mybookings" className="nav__link">
              My Bookings
            </Link>
          </li>
          <li className="nav__item">
            <a onClick={signOut} className="nav__link">
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
