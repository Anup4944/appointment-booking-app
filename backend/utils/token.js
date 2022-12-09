export const sendToken = (advisor, statusCode, res) => {
  const token = advisor.generateToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    status: "success",
    advisor,
    token,
  });
};
