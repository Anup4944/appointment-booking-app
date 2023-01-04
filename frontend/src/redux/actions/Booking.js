import axios from "axios";

export const bookAppointmentAction =
  (availableDate, time, lawyer, lawyerName, userName, userId) =>
  async (dispatch) => {
    try {
      dispatch({ type: "BookingRequest" });

      const { data } = await axios.post(
        "http://localhost:4000/api/v1/booking",
        { availableDate, time, lawyer, lawyerName, userName, userId },
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
