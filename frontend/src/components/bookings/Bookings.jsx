import React from "react";
import "../../styles/booking.scss";

const Bookings = ({ isClient }) => {
  return (
    <div className="bookingContainer">
      <h4 className="bookingHeader">Your upcoming bookings</h4>

      <div className="tableContainer">
        <table>
          <tbody>
            <tr>
              {isClient ? <th>Lawyer Name</th> : <th>Client Name</th>}
              <th>Email</th>
              <th>Date</th>
              <th>Time</th>
              <th>Booked on</th>
            </tr>

            <tr>
              <td>Name</td>
              <td>name@gmail.com</td>
              <td>10/12/2022</td>
              <td>10AM</td>
              <td>10/12/2022 </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
