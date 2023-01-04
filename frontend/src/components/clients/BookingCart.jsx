import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookAppointmentAction } from "../../redux/actions/Booking";
import { getAllAvailability } from "../../redux/actions/Advisor";
import toast, { Toaster } from "react-hot-toast";

const BookingCart = ({ client }) => {
  const dispatch = useDispatch();

  const { allAvailability, error } = useSelector(
    (state) => state.allAvailabilityReducer
  );

  const { message: bookedMsg } = useSelector((state) => state.bookingReducer);

  useEffect(() => {
    dispatch(getAllAvailability());
  }, [dispatch]);

  useEffect(() => {
    if (bookedMsg) {
      toast(bookedMsg, {
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
  }, [dispatch, bookedMsg]);

  return (
    <div className="mainCart">
      <Toaster position="top-center" reverseOrder={false} />
      {!allAvailability ? (
        <h3 className="errClass">{error}</h3>
      ) : (
        allAvailability?.map((item, key) => (
          <div className="bookingCard" key={item._id}>
            <ul>
              <li> Available Date :{item.availableDate}</li>
              <li> Time: {item.time}</li>
              <li> Lawyer's name: {item.lawyer.fullName}</li>
              <li> Email: {item.lawyer.email}</li>
              <li> Category: {item.lawyer.category}</li>
            </ul>
            <button
              onClick={async () => {
                await dispatch(
                  bookAppointmentAction(
                    item.availableDate,
                    item.time,
                    item.lawyer._id,
                    item.lawyer.fullName,
                    client.name,
                    client._id
                  )
                );
                await dispatch(getAllAvailability());
              }}
            >
              Book
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default BookingCart;
