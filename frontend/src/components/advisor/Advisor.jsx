import React, { useEffect } from "react";
import AvailableDateAndTime from "./AvailableDateAndTime";
import OpenAvailiabiltiy from "./OpenAvailiabiltiy";
import Bookings from "../bookings/Bookings";
import "../../styles/advisor.scss";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const Advisor = () => {
  const dispatch = useDispatch();
  const { message, advisor } = useSelector((state) => state.advisorReducer);

  useEffect(() => {
    if (message) {
      toast.success(`${message} as ${advisor.fullName}`, {
        icon: "✅",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          borderRadius: "10px",
        },
      });
      dispatch({ type: "clearMsg" });
    }
  }, [dispatch, message, advisor.fullName]);
  return (
    <>
      <div className="advisor">
        <Toaster position="top-center" reverseOrder={false} />
        <OpenAvailiabiltiy />
        <AvailableDateAndTime />
      </div>
      <Bookings />
    </>
  );
};

export default Advisor;
