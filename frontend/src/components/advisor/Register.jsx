import React from "react";
import { AiOutlineLock, AiOutlineTeam, AiOutlineMail } from "react-icons/ai";
import "../../styles/register.scss";

const Register = () => {
  const categories = [
    "Criminal Defense Lawyer",
    "Business Lawyer (Corporate Lawyer)",
    "Constitutional Lawyer",
    "Employment and Labor Lawyer",
    "Entertainment Lawyer",
    "Estate Planning Lawyer",
    "Immigration Lawyer",
    "Tax Lawyer",
  ];
  return (
    <div>
      <div>
        <form
          encType="multipart/form-data"
          // onSubmit={handleOnRegisterSubmit}
        >
          <div>
            <span>
              <AiOutlineTeam />
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
              <AiOutlineLock />
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
            <select>
              <option value=""> Lawyer category</option>

              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <button>Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
