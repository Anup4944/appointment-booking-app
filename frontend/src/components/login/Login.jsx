import React, { useState } from "react";
import "../../styles/login.scss";
import { FcGoogle } from "react-icons/fc";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
} from "react-icons/ai";

const Login = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="login">
      <div className="cart">
        <div className="left">
          <h1>Hello World.</h1>
          <p>Book an appoinment with best lawyers!</p>
          <button>
            Login with
            <FcGoogle />
          </button>
        </div>

        <div className="right">
          <h1>Advisor Login</h1>

          <form>
            <div className="passHolder">
              <input type="text" placeholder="Email" />

              <span>
                <AiOutlineMail />
              </span>
            </div>

            <div className="passHolder">
              <input type={show ? "text" : "password"} placeholder="Password" />
              {show ? (
                <span onClick={() => setShow((pre) => !pre)}>
                  <AiOutlineEye />
                </span>
              ) : (
                <span onClick={() => setShow((pre) => !pre)}>
                  <AiOutlineEyeInvisible />
                </span>
              )}
            </div>

            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
