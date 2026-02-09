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
        {message && <h3 className="form-title">{message}</h3>}
        <input
          className="form-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="submit-button" onClick={handleOnClick}>
          Send verification
        </button>
        <button onClick={() => (window.location.href = "/")}>
          Back to login
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
