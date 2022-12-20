import React, { useState, useEffect } from "react";
import {
  loadAdvisorAction,
  openAvailability,
} from "../../redux/actions/Advisor";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const OpenAvailiabiltiy = ({ id }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const dispatch = useDispatch();

  const disableButton = !date || !time;

  const { message } = useSelector((state) => state.availabilityReducer);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await dispatch(openAvailability(date, time, id));
    dispatch(loadAdvisorAction());
  };

  useEffect(() => {
    if (message) {
      toast(message, {
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
  }, [dispatch, message]);
  return (
    <div className="openAva">
      <Toaster position="top-center" reverseOrder={false} />
      <form className="availabiltyBox">
        <h2>Set your availability</h2>
        <input
          type="date"
          className="inputBox"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Available time eg: 10AM"
          className="inputBox"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <button
          className="setBtn"
          type="submit"
          onClick={handleOnSubmit}
          disabled={disableButton}
        >
          Set availability
        </button>
      </form>
    </div>
  );
};

export default OpenAvailiabiltiy;
