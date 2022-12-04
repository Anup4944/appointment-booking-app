import express from "express";
const router = express.Router();

import { register } from "../controller/advisorController.js";

router.route("/register").post(register);

export default router;
