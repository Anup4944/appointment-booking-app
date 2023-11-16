import React from "react";
import "../styles/header.scss";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../redux/actions/Advisor";
import { logoutClientAction } from "../redux/actions/Client";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { isAuth, advisor } = useSelector((state) => state.advisorReducer);
  const { isAuthenticated, client } = useSelector(
    (state) => state.clientReducer
  );

  const logoutHandler = () => {
    window.sessionStorage.removeItem("token");
    dispatch(logoutAction());
  };

  const googleLogout = () => {
    dispatch(logoutClientAction());
    navigate("/");
  };
  return (
    <div className="headerBar">
      {isAuth && <h1>Welcome, {advisor?.fullName}</h1>}
      {isAuthenticated && <h1>Welcome, {client?.name}</h1>}
      {isAuth && <button onClick={logoutHandler}>Logout</button>}
      {isAuthenticated && <button onClick={googleLogout}>Logout</button>}
    </div>
  );
};

export default Header;
