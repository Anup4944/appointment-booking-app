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
} from "../controller/advisorController.js";
import { isAuth } from "../middlewares/auth.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(isAuth, logout);
router.route("/all").get(getAllAdvisor);
router.route("/open/availability").post(isAuth, openAvailiability);
router.route("/profile").get(isAuth, advisorProfile);
router.route("/all/availability").get(isAuth, getAllAvailability);
router.route("/delete/available/:id").delete(isAuth, deleteAvailability);

export default router;
