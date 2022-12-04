import { Advisor } from "../models/Advisor.js";
import { asyncAwait, errorMiddleware } from "../middlewares/errorMiddleware.js";
import ErrorHandler from "../utils/errorHandler.js";

export const register = asyncAwait(async (req, res, next) => {
  const { fullName, email, password, category } = req.body;

  let advisor = await Advisor.findOne({ email });

  if (advisor) {
    return next(new ErrorHandler("User already exist with this email", 402));
  }

  advisor = await Advisor.create({
    fullName,
    email: email?.trim().toLowerCase(),
    password,
    category,
  });

  const token = await advisor.generateToken();

  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(201).cookie("token", token, options).json({
    success: true,
    message: "Your account has registered succesfully",
    advisor,
    token,
  });
});
