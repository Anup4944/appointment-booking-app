import React from "react";
import { AiOutlineLock } from "react-icons/ai";
import "../../styles/resetPassword.scss";

const ResetPassword = () => {
  return (
    <div>
      <div>
        <form
          encType="multipart/form-data"
          // onSubmit={handleOnRegisterSubmit}
        >
          <div>
            <span>
              <AiOutlineLock />
            </span>{" "}
            <input
              type="password"
              placeholder="Enter your new password"
              required
              name="password"
              // value={password}
              // onChange={handleOnChange}
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
              // value={password}
              // onChange={handleOnChange}
            />
          </div>
          <button>Reset</button>
          <a href="/">Back to login</a>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
