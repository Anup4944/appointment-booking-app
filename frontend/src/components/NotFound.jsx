import React from "react";
import "../styles/notFound.scss";

const NotFound = () => {
  return (
    <div className="notFound">
      <div className="notFoundWrapper">
        <h3>Page Not Found </h3>
        <a href="/">Back to login</a>
      </div>
    </div>
  );
};

export default NotFound;
