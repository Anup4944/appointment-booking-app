import React, { useEffect } from "react";
import "./styles/app.scss";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { loadAdvisorAction } from "./redux/actions/Advisor";
import { loadClientAction } from "./redux/actions/Client";
import { lazy, Suspense } from "react";
import { Loading } from "./components";

const Advisor = lazy(() => import("./components/advisor/Advisor"));
const Client = lazy(() => import("./components/clients/Client"));
const Login = lazy(() => import("./components/login/Login"));

const App = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.advisorReducer);

  useEffect(() => {
    dispatch(loadAdvisorAction());
    dispatch(loadClientAction());
  }, [dispatch]);

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <div className="main">
          <Routes>
            <Route path="/" element={isAuth ? <Advisor /> : <Login />} />
            <Route path="/client/home" element={<Client />} />
          </Routes>
        </div>
      </Suspense>
    </Router>
  );
};

export default App;
