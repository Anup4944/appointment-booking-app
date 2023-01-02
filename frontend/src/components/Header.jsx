import React from "react";
import "../styles/header.scss";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../redux/actions/Advisor";
import { logoutClientAction } from "../redux/actions/Client";

const Header = () => {
  const dispatch = useDispatch();
  const { isAuth, advisor } = useSelector((state) => state.advisorReducer);
  const { isAuthenticated, client } = useSelector(
    (state) => state.clientReducer
  );

  const logoutHandler = () => {
    dispatch(logoutAction());
  };

  const googleLogout = () => {
    dispatch(logoutClientAction());
  };
  return (
    <div className="headerBar">
      {isAuth ? (
        <h1>Welcome, {advisor.fullName}</h1>
      ) : (
        <h1>Your legal advisor</h1>
      )}
      {isAuth && <button onClick={logoutHandler}>Logout</button>}
      {isAuthenticated && <button onClick={googleLogout}>Logout</button>}
    </div>
  );
};

export default Header;
