import express from "express";
import passport from "passport";
import { logout, myProfile } from "../controller/clientController.js";
import { isAuthenticated } from "../middlewares/googleAuth.js";

const router = express.Router();

router.get(
  "/google/login",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get(
  "/login/acc",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.send("Logged In");
  }
);

router.get("/google/profile", isAuthenticated, myProfile);

// router.get("/me", isAuthenticated, myProfile);
router.get("/google/logout", logout);

export default router;
