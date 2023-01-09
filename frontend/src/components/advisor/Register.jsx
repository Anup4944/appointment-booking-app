import React from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
} from "react-icons/ai";
import "../../styles/register.scss";

const Register = () => {
  return (
    <div>
      <div>
        <form
          encType="multipart/form-data"
          // onSubmit={handleOnRegisterSubmit}
        >
          <div>
            <span>
              <AiOutlineMail />
            </span>{" "}
            <input
              type="text"
              placeholder="Enter your full name"
              required
              name="name"
              // value={name}
              // onChange={handleOnChange}
            />
          </div>

          <div>
            <span>
              <AiOutlineMail />
            </span>{" "}
            <input
              type="email"
              placeholder="Enter your email"
              required
              // value={email}
              name="email"
              // onChange={handleOnChange}
            />
          </div>

          <div>
            <span>
              <AiOutlineMail />
            </span>{" "}
            <input
              type="password"
              placeholder="Enter password"
              required
              name="password"
              // value={password}
              // onChange={handleOnChange}
            />
          </div>
          <div>
            <span>
              <AiOutlineMail />
            </span>{" "}
            <input
              type="password"
              placeholder="Enter password"
              required
              name="password"
              // value={password}
              // onChange={handleOnChange}
            />
          </div>
          <button>Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
