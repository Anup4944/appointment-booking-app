import React from "react";

const BookingCart = ({ message, allAva }) => {
  return (
    <div className="mainCart">
      {/* <h1>{message}</h1>{" "} */}
      {allAva?.map((item, key) => (
        <div className="bookingCard">
          <ul>
            <li> Available Date :{item.availableDate}</li>
            <li> Time: {item.time}</li>
            <li> Lawyer's name: {item.lawyer.fullName}</li>
            <li> Email: {item.lawyer.email}</li>
            <li> Category: {item.lawyer.category}</li>
          </ul>
          <button>Book</button>
        </div>
      ))}
    </div>
  );
};

export default BookingCart;
