import React, { useEffect } from "react";
import "../../styles/booking.scss";
import { useDispatch, useSelector } from "react-redux";
import { AiFillCloseCircle } from "react-icons/ai";
import {
  deleteBookingByAdvisorAction,
  getBookingsById,
} from "../../redux/actions/Booking";
import { formatDate } from "../../utils/formatDate";

const Bookings = ({ isClient, client, id }) => {
  const dispatch = useDispatch();

  const { yourBookings, error } = useSelector(
    (state) => state.bookingByIdReducer
  );
  useEffect(() => {
    dispatch(getBookingsById(id));
  }, [dispatch, id]);
  return (
    <div className="bookingContainer">
      <h4 className="bookingHeader">Your upcoming bookings</h4>
      <div className="tableContainer">
        {!yourBookings ? (
          <h3 className="errClass">{error}</h3>
        ) : (
          <table>
            <tbody>
              <tr>
                {isClient ? <th>Lawyer Name</th> : <th>Client Name</th>}
                {isClient ? <th>Lawyer's Email</th> : <th>Client's Email</th>}
                <th>Booking date</th>
                <th>Time</th>
                <th>Booked on</th>
                <th>Action</th>
              </tr>
              {yourBookings?.map((item, key) => (
                <tr key={item}>
                  <td>{isClient ? item.lawyerName : item.userName} </td>
                  <td>{isClient ? item.lawyerEmail : item.userEmail}</td>
                  <td>{formatDate(item.bookedDate)}</td>
                  <td>{item.time}</td>
                  <td>{formatDate(item.createdAt)} </td>
                  <td>
                    <AiFillCloseCircle
                      onClick={async () => {
                        isClient
                          ? console.log("CLICKED")
                          : await dispatch(
                              deleteBookingByAdvisorAction(
                                id,
                                item.time,
                                item.bookedDate,
                                item.lawyerName,
                                item.lawyerEmail,
                                item.userEmail,
                                item.userName,
                                item.user
                              )
                            );
                        await dispatch(getBookingsById(id));
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Bookings;
