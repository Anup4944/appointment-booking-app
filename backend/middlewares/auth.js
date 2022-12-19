import ErrorHandler from "../utils/errorHandler.js";
import { asyncAwait } from "./errorMiddleware.js";
import jwt from "jsonwebtoken";
import { Advisor } from "../models/Advisor.js";

export const isAuth = asyncAwait(async (req, res, next) => {
  const { token } = req.cookies;

  // console.log(token);

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.advisor = await Advisor.findById(decodedData._id);

  next();
});
