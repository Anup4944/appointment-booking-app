import React from "react";
import BookingCart from "./BookingCart";
import Bookings from "../bookings/Bookings";
import "../../styles/client.scss";

const Client = () => {
  return (
    <>
      <BookingCart />
      <Bookings isClient />
    </>
  );
};

export default Client;
