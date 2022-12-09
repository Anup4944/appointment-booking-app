import express from "express";
const router = express.Router();

import {
  register,
  login,
  logout,
  openAvailiability,
  getAllAdvisor,
} from "../controller/advisorController.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/all").get(getAllAdvisor);
router.route("/open/availability").post(openAvailiability);

export default router;
