import axios from "axios";

export const loadClientAction = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadClientRequest" });

    const { data } = await axios.get(
      "http://localhost:4000/api/v1/google/profile",
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
    console.log("From Google", data);
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
