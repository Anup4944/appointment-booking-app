import React, { useEffect } from "react";
import "../../styles/bookings.scss";
import { useDispatch, useSelector } from "react-redux";
import { AiFillCloseCircle } from "react-icons/ai";
import {
  deleteBookingAction,
  getBookingsById,
} from "../../redux/actions/Booking";
import { formatDate } from "../../utils/formatDate";
import {
  getAllAvailability,
  loadAdvisorAction,
} from "../../redux/actions/Advisor";

const Bookings = ({ isClient, client, id }) => {
  const dispatch = useDispatch();

  const { yourBookings, message } = useSelector(
    (state) => state.bookingByIdReducer
  );

  useEffect(() => {
    dispatch(getBookingsById(id));
  }, [dispatch, id]);

  return (
    <div className="bookingContainer">
      <h4 className="bookingHeader">Your upcoming bookings</h4>
      <div className="tableContainer">
        {yourBookings?.length < 1 ? (
          <h3 className="errClass">{message}</h3>
        ) : (
          <table>
            <caption>Your bookings</caption>
            <thead>
              <tr>
                {isClient ? <th>Lawyer Name</th> : <th>Client Name</th>}
                {isClient ? <th>Lawyer's Email</th> : <th>Client's Email</th>}
                <th>Booking date</th>
                <th>Time</th>
                <th>Booked on</th>
                <th>Action</th>
              </tr>
            </thead>
            {yourBookings?.map((item, key) => (
              <tbody>
                <tr key={item._id}>
                  <td
                    data-label={`${isClient ? "Lawyer Name" : "Client Name"}`}
                  >
                    {isClient ? item.lawyerName : item.userName}{" "}
                  </td>
                  <td
                    data-label={`${
                      isClient ? "Lawyer's Email" : "Client's Email"
                    }`}
                  >
                    {isClient ? item.lawyerEmail : item.userEmail}
                  </td>
                  <td data-label="Booked Date">
                    {formatDate(item.bookedDate)}
                  </td>
                  <td data-label="Booked Time">{item.time}</td>
                  <td data-label="Booked On">{formatDate(item.createdAt)} </td>
                  <td data-label="Action">
                    <AiFillCloseCircle
                      onClick={async () =>
                        isClient
                          ? (await dispatch(
                              deleteBookingAction(
                                item._id,
                                item.time,
                                item.bookedDate,
                                item.lawyer,
                                item.lawyerName,
                                item.lawyerEmail,
                                item.userEmail,
                                item.userName,
                                item.user,
                                isClient
                              )
                            ),
                            await dispatch(getBookingsById(id)),
                            dispatch(getAllAvailability()))
                          : (await dispatch(
                              deleteBookingAction(
                                item._id,
                                item.time,
                                item.bookedDate,
                                item.lawyer,
                                item.lawyerName,
                                item.lawyerEmail,
                                item.userEmail,
                                item.userName,
                                item.user,
                                (isClient = false)
                              )
                            ),
                            await dispatch(getBookingsById(id)),
                            await dispatch(loadAdvisorAction()))
                      }
                    />
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        )}
      </div>
    </div>
  );
};

export default Bookings;
