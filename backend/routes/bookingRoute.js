import express from "express";
const router = express.Router();

import {
  allBookings,
  bookAppointment,
  deleteBooking,
  getBookingById,
} from "../controller/bookingController.js";

router.route("/booking").post(bookAppointment).get(allBookings);
router.route("/booking/:id").get(getBookingById);
router.route("/delete/booking/:id").post(deleteBooking);

export default router;
