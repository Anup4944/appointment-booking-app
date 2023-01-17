import axios from "axios";

export const loginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LoginRequest" });

    const { data } = await axios.post(
      "http://localhost:4000/api/v1/login",
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
        "http://localhost:4000/api/v1/register",
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

    const { data } = await axios.get("http://localhost:4000/api/v1/profile", {
      withCredentials: true,
      credentials: "include",
    });

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

    const { data } = await axios.get(`http://localhost:4000/api/v1/logout`, {
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
      "http://localhost:4000/api/v1/open/availability",
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
      `http://localhost:4000/api/v1/delete/available/${availabilityId}`,

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
      `http://localhost:4000/api/v1/all/availability`,

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
      "http://localhost:4000/api/v1/forgot/password",
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
        `http://localhost:4000/api/v1/reset/password/${token}`,
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
