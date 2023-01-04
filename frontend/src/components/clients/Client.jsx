import React from "react";
import BookingCart from "./BookingCart";
import Bookings from "../bookings/Bookings";
import "../../styles/client.scss";
import { useSelector } from "react-redux";

const Client = () => {
  const { client } = useSelector((state) => state.clientReducer);

  return (
    <>
      <BookingCart client={client} />
      <Bookings isClient client={client} id={client?._id} />
    </>
  );
};

export default Client;
