import express from "express";
const router = express.Router();

import {
  allBookings,
  bookAppointment,
  deleteBookingByAdvisor,
  getBookingByUserId,
} from "../controller/bookingController.js";
import { isAuthenticated } from "../middlewares/googleAuth.js";
import { isAuth } from "../middlewares/auth.js";

router.route("/booking").post(bookAppointment).get(allBookings);
router.route("/users/booking").get(getBookingByUserId);
router
  .route("/delete/advisor/booking/:id")
  .delete(isAuth, deleteBookingByAdvisor);

export default router;
