import React, { useState } from "react";

const OpenAvailiabiltiy = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const disableButton = !date || !time;

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="openAva">
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
        {/* )} */}
      </form>
    </div>
  );
};

export default OpenAvailiabiltiy;
