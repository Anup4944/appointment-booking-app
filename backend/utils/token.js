import { getCookieOptions } from "./cookieHelper";

export const sendToken = (advisor, statusCode, res, message) => {
  const token = advisor.generateToken();

  const options = getCookieOptions();

  // const options = {
  //   expires: new Date(
  //     Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
  //   ),
  //   httpOnly: true,
  //   withCredentials: true,
  //   sameSite: "none",
  //   secure: true,
  // };

  // console.log("JWT", token);

  res.status(statusCode).cookie("token", token, options).json({
    status: true,
    message,
    advisor,
    token,
  });
};
