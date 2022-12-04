import React from "react";
import AvailableDateAndTime from "./AvailableDateAndTime";
import OpenAvailiabiltiy from "./OpenAvailiabiltiy";
import Bookings from "../bookings/Bookings";
import "../../styles/advisor.scss";

const Advisor = () => {
  return (
    <>
      <div className="advisor">
        <OpenAvailiabiltiy />
        <AvailableDateAndTime />
      </div>
      <Bookings />
    </>
  );
};

export default Advisor;
