import axios from "axios";
import { server } from "../store";

export const bookAppointmentAction =
  (
    availableDate,
    time,
    lawyer,
    lawyerName,
    lawyerEmail,
    userEmail,
    userName,
    userId
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: "BookingRequest" });

      const { data } = await axios.post(
        `${server}/booking`,
        {
          availableDate,
          time,
          lawyer,
          lawyerName,
          lawyerEmail,
          userEmail,
          userName,
          userId,
        },
        { withCredentials: true, credentials: "include" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: "BookingSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "BookingFailure",
        payload: error.response.data.message,
      });
    }
  };
export const getBookingsById = (id) => async (dispatch) => {
  try {
    dispatch({ type: "BookingByIdRequest" });

    const { data } = await axios.get(
      `${server}/booking/${id}`,

      { withCredentials: true, credentials: "include" },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: "BookingByIdSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "BookingByIdFailure",
      payload: error.response.data.message,
    });
  }
};

export const deleteBookingAction =
  (
    id,
    time,
    bookedDate,
    lawyer,
    lawyerName,
    lawyerEmail,
    userEmail,
    userName,
    userId,
    isClient
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "DeleteBookingByAdvisorRequest",
      });

      const { data } = await axios.post(
        `${server}/delete/booking/${id}`,
        {
          time,
          bookedDate,
          lawyer,
          lawyerName,
          lawyerEmail,
          userEmail,
          userName,
          userId,
          isClient,
        },
        { withCredentials: true, credentials: "include" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: "DeleteBookingByAdvisorSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "DeleteBookingByAdvisorFailure",
        payload: error.response.data.message,
      });
    }
  };
