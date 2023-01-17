import React, { useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import "../../styles/resetPassword.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordAction } from "../../redux/actions/Advisor";
import { Loading } from "..";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const { isLoading, message } = useSelector(
    (state) => state.recoverPasswordReducer
  );

  const handleOnRegisterSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordAction(token, password, confirmPassword));
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <div>
        <form encType="multipart/form-data" onSubmit={handleOnRegisterSubmit}>
          {message && <h3>{message}</h3>}

          <div>
            <span>
              <AiOutlineLock />
            </span>{" "}
            <input
              type="password"
              placeholder="Enter your new password"
              required
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <span>
              <AiOutlineLock />
            </span>{" "}
            <input
              type="password"
              placeholder="Confirm password"
              required
              name="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit">Reset</button>
          <a href="/">Back to login</a>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
