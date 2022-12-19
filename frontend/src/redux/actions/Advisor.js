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

    dispatch({ type: "LogoutUserSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "LogoutUserFailure",
      payload: error.response.data.message,
    });
  }
};
