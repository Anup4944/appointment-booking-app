import React from "react";
import BookingCart from "./BookingCart";
import Bookings from "../bookings/Bookings";
import "../../styles/client.scss";
import { useSelector } from "react-redux";
import Header from "../Header";
import { Loading } from "..";

const Client = () => {
  const { client } = useSelector((state) => state.clientReducer);
  const { isLoading } = useSelector((state) => state.bookingReducer);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <BookingCart client={client} />
          <Bookings isClient client={client} id={client?._id} />
        </>
      )}
    </>
  );
};

export default Client;
