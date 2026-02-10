import express from "express";
const router = express.Router();

import {
  register,
  login,
  logout,
  openAvailiability,
  getAllAdvisor,
  advisorProfile,
  getAllAvailability,
  deleteAvailability,
  forgotPassword,
  resetPassword,
  deleteExpiredAvailability,
} from "../controller/advisorController.js";
import { isAuth } from "../middlewares/auth.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/all").get(getAllAdvisor);
router.route("/open/availability").post(isAuth, openAvailiability);
router.route("/profile").get(isAuth, advisorProfile);
router.route("/all/availability").get(getAllAvailability);
router.route("/delete/available/:id").delete(isAuth, deleteAvailability);
router.route("/forgot/password").post(forgotPassword);
router.route("/reset/password/:token").put(resetPassword);
router.route("/delete/expired/availability").delete(deleteExpiredAvailability);

export default router;
