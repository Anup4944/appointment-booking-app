import express from "express";
const router = express.Router();

import {
  allBookings,
  bookAppointment,
  deleteBookingByAdvisor,
  getBookingById,
  deleteBookingByClient,
} from "../controller/bookingController.js";
import { isAuth } from "../middlewares/auth.js";

router.route("/booking").post(bookAppointment).get(allBookings);
router.route("/booking/:id").get(getBookingById);
router.route("/delete/advisor/booking/:id").delete(deleteBookingByAdvisor);
router
  .route("/delete/client/booking/:id")
  .delete(isAuth, deleteBookingByClient);

export default router;
