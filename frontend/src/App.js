import React from "react";
import "./styles/app.scss";
import { Advisor, Client, Login, Header } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="main">
        <Header />
        <Routes>
          <Route extact path="/" element={<Login />} />
          <Route extact path="/advisor/home" element={<Advisor />} />
          <Route extact path="/client/home" element={<Client />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
