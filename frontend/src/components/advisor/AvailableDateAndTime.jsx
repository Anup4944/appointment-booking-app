import React from "react";

const AvailableDateAndTime = ({ advisor }) => {
  return (
    <div className="avaDateTime">
      <div className="container">
        {advisor?.availableDatesAndTime.map((item, key) => (
          <div className="card" key={item._id}>
            <div className="dateAndTime">
              <h4>Date : {item.availableDate}</h4>
              <h4>Time : {item.time}</h4>
            </div>
            <button>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableDateAndTime;
