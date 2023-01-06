import React, { useState, useEffect } from "react";
import "../../styles/login.scss";
import { FcGoogle } from "react-icons/fc";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
} from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/actions/Advisor";
import { Loading } from "..";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { message, error, isLoading } = useSelector(
    (state) => state.advisorReducer
  );
  const { isLoading: googleLoading } = useSelector(
    (state) => state.clientReducer
  );

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAction(email, password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        icon: "❌",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          borderRadius: "10px",
        },
      });
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      toast.success(message, {
        icon: "✅",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          borderRadius: "10px",
        },
      });
      dispatch({ type: "clearMsg" });
    }
  }, [dispatch, message, error]);

  const handleOnLogin = () => {
    window.open(`http://localhost:4000/api/v1/google/login`, "_self");
  };

  return isLoading || googleLoading ? (
    <Loading />
  ) : (
    <div className="login">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="cart">
        <div className="left">
          <h1>Hello World.</h1>
          <p>Book an appoinment with best lawyers!</p>
          <button onClick={handleOnLogin}>
            Login with
            <FcGoogle />
          </button>
        </div>

        <div className="right">
          <h1>Advisor Login</h1>

          <form onSubmit={handleOnSubmit}>
            <div className="passHolder">
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <span>
                <AiOutlineMail />
              </span>
            </div>

            <div className="passHolder">
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
