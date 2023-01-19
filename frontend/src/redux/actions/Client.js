import axios from "axios";

export const loadClientAction = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadClientRequest" });

    const { data } = await axios.get(
      "https://api-appointment.onrender.com/api/v1/google/profile",
      {
        withCredentials: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }
    );
    dispatch({
      type: "LoadClientSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadClientFailure",
      payload: error.response.data.message,
    });
  }
};
export const logoutClientAction = () => async (dispatch) => {
  try {
    dispatch({ type: "LogoutClientRequest" });

    await axios.get(
      "https://api-appointment.onrender.com/api/v1/google/logout",
      {
        withCredentials: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      }
    );

    dispatch({
      type: "LogoutClientSuccess",
    });
  } catch (error) {
    dispatch({
      type: "LogoutClientFailure",
      payload: error.response.data.message,
    });
  }
};
