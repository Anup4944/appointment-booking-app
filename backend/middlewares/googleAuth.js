import ErrorHandler from "../utils/errorHandler.js";

export const isAuthenticated = async (req, res, next) => {
  const token = req.cookies["connect.sid"];

  if (!token) {
    return next(new ErrorHandler("Not logged in", 401));
  }

  next();
};
