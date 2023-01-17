import React, { useState } from "react";
import "../../styles/forgotPassword.scss";
import { useSelector, useDispatch } from "react-redux";
import { forgetPasswordAction } from "../../redux/actions/Advisor";
import { Loading } from "..";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const { isLoading, message } = useSelector(
    (state) => state.recoverPasswordReducer
  );

  const handleOnClick = () => {
    dispatch(forgetPasswordAction(email));
  };
  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <div>
        {message && <h3>{message}</h3>}
        <input
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleOnClick}>Send verification</button>
        <a href="/">Back to login</a>
      </div>{" "}
    </div>
  );
};

export default ForgotPassword;
