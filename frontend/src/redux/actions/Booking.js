import axios from "axios";

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
        "http://localhost:4000/api/v1/booking",
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
      `http://localhost:4000/api/v1/booking/${id}`,

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
    userId
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "DeleteBookingByAdvisorRequest",
      });

      const { data } = await axios.post(
        `http://localhost:4000/api/v1/delete/booking/${id}`,
        {
          time,
          bookedDate,
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

      dispatch({ type: "DeleteBookingByAdvisorSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "DeleteBookingByAdvisorFailure",
        payload: error.response.data.message,
      });
    }
  };
