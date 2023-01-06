import React, { useEffect } from "react";
import AvailableDateAndTime from "./AvailableDateAndTime";
import OpenAvailiabiltiy from "./OpenAvailiabiltiy";
import Bookings from "../bookings/Bookings";
import "../../styles/advisor.scss";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import Header from "../Header";
import { Loading } from "..";

const Advisor = () => {
  const dispatch = useDispatch();
  const { message, advisor } = useSelector((state) => state.advisorReducer);

  const { isLoading } = useSelector((state) => state.availabilityReducer);

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
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {" "}
          <Header />
          <div className="advisor">
            <Toaster position="top-center" reverseOrder={false} />
            <OpenAvailiabiltiy id={advisor?._id} />
            <AvailableDateAndTime advisor={advisor} />
          </div>
          <Bookings id={advisor?._id} />
        </>
      )}
    </>
  );
};

export default Advisor;
