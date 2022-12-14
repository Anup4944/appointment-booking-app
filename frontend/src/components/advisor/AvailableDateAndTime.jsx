import React from "react";
import {
  deleteAvailability,
  loadAdvisorAction,
} from "../../redux/actions/Advisor";
import { useDispatch } from "react-redux";
import { formatDate } from "../../utils/formatDate";

const AvailableDateAndTime = ({ advisor }) => {
  const dispatch = useDispatch();

  return (
    <div className="avaDateTime">
      <div className="container">
        {advisor?.availableDatesAndTime.length <= 0 ? (
          <div className="noAva">
            {" "}
            <h1>You have not added availability</h1>
          </div>
        ) : (
          advisor?.availableDatesAndTime.map((item, key) => (
            <div className="card" key={item._id}>
              <div className="dateAndTime">
                <h4>Date : {formatDate(item.availableDate)}</h4>
                <h4>Time : {item.time}</h4>
                <button
                  onClick={async () => {
                    await dispatch(deleteAvailability(item._id));
                    dispatch(loadAdvisorAction());
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AvailableDateAndTime;
