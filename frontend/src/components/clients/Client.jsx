import React, { useEffect } from "react";
import BookingCart from "./BookingCart";
import Bookings from "../bookings/Bookings";
import "../../styles/client.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllAvailability } from "../../redux/actions/Advisor";

const Client = () => {
  const dispatch = useDispatch();

  const { message, allAvailability } = useSelector(
    (state) => state.allAvailabilityReducer
  );

  useEffect(() => {
    dispatch(getAllAvailability());
  }, [dispatch]);

  return (
    <>
      <BookingCart message={message} allAva={allAvailability} />
      <Bookings isClient />
    </>
  );
};

export default Client;
