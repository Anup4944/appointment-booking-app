import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";

export const isAuthenticated = async (req, res, next) => {
  const token = req.cookies["connect.sid"];

  console.log(token);

  if (!token) {
    return next(new ErrorHandler("Not logged in", 401));
  }

  // req.user = await User.findById(req.session.passport.user);

  next();
};
