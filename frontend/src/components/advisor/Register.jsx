import React, { useState } from "react";
import { AiOutlineLock, AiOutlineTeam, AiOutlineMail } from "react-icons/ai";
import "../../styles/register.scss";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../../redux/actions/Advisor";
import Loading from "../Loading";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const { message, isLoading } = useSelector((state) => state.advisorReducer);

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

  const handleOnRegisterSubmit = (e) => {
    e.preventDefault();
    dispatch(registerAction(fullName, email, password, category));
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      {" "}
      <div>
        <div>
          <form encType="multipart/form-data" onSubmit={handleOnRegisterSubmit}>
            {message && <h3>{message}</h3>}
            <div className="form-header">
              <h3>Lawyer Registration</h3>
              <p>Create your account to get started</p>
            </div>
            <div>
              <span>
                <AiOutlineTeam />
              </span>{" "}
              <input
                type="text"
                placeholder="Enter your full name"
                required
                name="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value=""> Lawyer category</option>

                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit">Register</button>
            <button onClick={() => (window.location.href = "/")}>
              Back to login
            </button>{" "}
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
