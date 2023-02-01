import { asyncAwait } from "../middlewares/errorMiddleware.js";

export const myProfile = asyncAwait(async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

export const logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);

    res.clearCookie("connect.sid", {
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });
    res.status(200).json({
      message: "Logged Out",
    });
  });
};
