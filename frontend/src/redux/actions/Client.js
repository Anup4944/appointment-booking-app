import axios from "axios";
import { server } from "../store";

export const loadClientAction = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadClientRequest" });

    const { data } = await axios.get(
      `${server}/google/profile`,
      {
        secure: true,
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
      `${server}/google/logout`,
      {
        withCredentials: true,
        secure: true,
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
