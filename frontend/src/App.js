import React, { useEffect } from "react";
import "./styles/app.scss";
import { Advisor, Client, Login } from "./components";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { loadAdvisorAction } from "./redux/actions/Advisor";
import { loadClientAction } from "./redux/actions/Client";

const App = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.advisorReducer);

  useEffect(() => {
    dispatch(loadAdvisorAction());
    dispatch(loadClientAction());
  }, [dispatch]);

  return (
    <Router>
      <div className="main">
        <Routes>
          <Route path="/" element={isAuth ? <Advisor /> : <Login />} />

          <Route path="/client/home" element={<Client />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
