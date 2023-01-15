import React from "react";
import "../../styles/forgotPassword.scss";

const ForgotPassword = () => {
  return (
    <div>
      <div>
        <input placeholder="Enter your email" />
        <button>Send verification</button>
        <a href="/">Back to login</a>
      </div>{" "}
    </div>
  );
};

export default ForgotPassword;
