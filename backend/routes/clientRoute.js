import express from "express";
import passport from "passport";
import { logout, myProfile } from "../controller/clientController.js";
import { isAuthenticated } from "../middlewares/googleAuth.js";

const router = express.Router();

router.get(
  "/google/login",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get(
  "/login",
  passport.authenticate("google", {
    scope: ["profile"],
    successRedirect: process.env.FRONTEND_URL,
  }),
  (req, res, next) => {
    res.send("Logged In");
  }
);

// router.get("/login", passport.authenticate("google"), (req, res, next) => {
//   res.send("Logged In");
// });

router.get("/me", isAuthenticated, myProfile);
router.get("/google/logout", isAuthenticated, logout);

export default router;
