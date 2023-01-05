import express from "express";
const router = express.Router();

import {
  allBookings,
  bookAppointment,
  deleteBooking,
  getBookingById,
} from "../controller/bookingController.js";
import { isAuth } from "../middlewares/auth.js";

router.route("/booking").post(bookAppointment).get(allBookings);
router.route("/booking/:id").get(getBookingById);
router.route("/delete/booking/:id").delete(deleteBooking);

export default router;
