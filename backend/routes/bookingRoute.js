import express from "express";
const router = express.Router();

import {
  allBookings,
  bookAppointment,
} from "../controller/bookingController.js";

router.route("/booking").post(bookAppointment).get(allBookings);

export default router;
