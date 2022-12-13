import express from "express";
import passport from "passport";
import { myProfile } from "../controller/clientController.js";

const router = express.Router();

router.get(
  "/google/login",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

// router.get(
//   "/login",
//   passport.authenticate("google", {
//     scope: ["profile"],
//     successRedirect: process.env.FRONTEND_URL,
//   })
// );

router.get("/login", passport.authenticate("google"), (req, res, next) => {
  res.send("Logged In");
});

router.get("/me", myProfile);
export default router;
