import { asyncAwait } from "../middlewares/errorMiddleware.js";

export const myProfile = asyncAwait(async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});
