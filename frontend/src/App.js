import React, { useEffect } from "react";
import "./styles/app.scss";
import { Advisor, Client, Login, Header } from "./components";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { loadAdvisorAction } from "./redux/actions/Advisor";
import { loadClientAction } from "./redux/actions/Client";
// import { ProtectedRoute } from "protected-route-react";

const App = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.advisorReducer);
  const { isAuthenticated } = useSelector((state) => state.clientReducer);

  useEffect(() => {
    dispatch(loadAdvisorAction());
    dispatch(loadClientAction());
  }, [dispatch]);

  return (
    <Router>
      <div className="main">
        <Header />
        <Routes>
          <Route path="/" element={isAuth ? <Advisor /> : <Login />} />

          <Route path="/client/home" element={<Client />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
