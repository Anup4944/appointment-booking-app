import React from "react";
import "../styles/header.scss";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../redux/actions/Advisor";

const Header = () => {
  const dispatch = useDispatch();
  const { isAuth, advisor, message } = useSelector(
    (state) => state.advisorReducer
  );

  const logoutHandler = async () => {
    await dispatch(logoutAction());
    // alert(message);
  };
  return (
    <div className="headerBar">
      {isAuth ? (
        <h1>Welcome, {advisor.fullName}</h1>
      ) : (
        <h1>Your legal advisor</h1>
      )}
      {isAuth && <button onClick={logoutHandler}>Logout</button>}
    </div>
  );
};

export default Header;
