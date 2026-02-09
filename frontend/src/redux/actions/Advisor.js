import axios from "axios";
import { server } from "../store";

export const loginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LoginRequest" });

    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      { withCredentials: true, credentials: "include" },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: "LoginSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "LoginFailure", payload: error.response.data.message });
  }
};

export const registerAction =
  (fullName, email, password, category) => async (dispatch) => {
    try {
      dispatch({ type: "RegisterRequest" });

      const { data } = await axios.post(
        `${server}/register`,
        { fullName, email, password, category },
        { withCredentials: true, credentials: "include" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: "RegisterSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "RegisterFailure",
        payload: error.response.data.message,
      });
    }
  };

export const loadAdvisorAction = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadUserRequest" });

    const { data } = await axios.get(
      `${server}/profile`,
      {
        withCredentials: true,
        credentials: "include",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "LoadUserSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({ type: "LoadUserFailure", payload: error.response.data.message });
  }
};

export const logoutAction = () => async (dispatch) => {
  try {
    dispatch({ type: "LogoutUserRequest" });

    const { data } = await axios.get(`${server}/logout`, {
      withCredentials: true,
      credentials: "include",
    });

    dispatch({ type: "LogoutUserSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "LogoutUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const openAvailability = (date, time, id) => async (dispatch) => {
  try {
    dispatch({ type: "openAvailabilityRequest" });
    const { data } = await axios.post(
      `${server}/open/availability`,
      { availableDate: date, time, id },
      { withCredentials: true, credentials: "include" },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "openAvailabilitySuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "openAvailabilityFailure",
      payload: error.response.data.message,
    });
  }
};

export const deleteAvailability = (availabilityId) => async (dispatch) => {
  try {
    dispatch({ type: "deleteAvailabilityRequest" });
    const { data } = await axios.delete(
      `${server}/delete/available/${availabilityId}`,

      { withCredentials: true, credentials: "include" },

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: "deleteAvailabilitySuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "deleteAvailabilityFailure",
      payload: error.response.data.message,
    });
  }
};

export const getAllAvailability = () => async (dispatch) => {
  try {
    dispatch({ type: "allAvailabilityRequest" });
    const { data } = await axios.get(
      `${server}/all/availability`,

      { withCredentials: true, credentials: "include" },

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: "allAvailabilitySuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "allAvailabilityFailure",
      payload: error.response.data.message,
    });
  }
};

export const forgetPasswordAction = (email) => async (dispatch) => {
  try {
    dispatch({ type: "ForgetPasswordRequest" });

    const { data } = await axios.post(
      `${server}/forgot/password`,
      { email },
      { withCredentials: true, credentials: "include" },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: "ForgetPasswordSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "ForgetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

export const resetPasswordAction =
  (token, password, confirmPassword) => async (dispatch) => {
    try {
      dispatch({ type: "ResetPasswordRequest" });

      const { data } = await axios.put(
        `${server}/reset/password/${token}`,
        { password, confirmPassword },
        { withCredentials: true, credentials: "include" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: "ResetPasswordSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "ResetPasswordFailure",
        payload: error.response.data.message,
      });
    }
  };

export const deleteExpiredAvailability = () => async (dispatch) => {
  try {
    dispatch({ type: "deleteExpiredAvailabilityRequest" });
    await axios.delete(
      `${server}/delete/expired/availability`,

      { withCredentials: true, credentials: "include" },

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: "deleteExpiredAvailabilitySuccess" });
  } catch (error) {
    dispatch({
      type: "deleteExpiredAvailabilityFailure",
      payload: error.response.data.message,
    });
  }
};
