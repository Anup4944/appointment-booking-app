import express from "express";
const router = express.Router();

import {
  allBookings,
  bookAppointment,
  getBookingByUserId,
} from "../controller/bookingController.js";
import { isAuthenticated } from "../middlewares/googleAuth.js";

router.route("/booking").post(bookAppointment).get(allBookings);
router.route("/users/booking").get(isAuthenticated, getBookingByUserId);

export default router;
