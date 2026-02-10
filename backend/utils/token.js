export const sendToken = (advisor, statusCode, res, message) => {
  const token = advisor.generateToken();

  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    status: true,
    message,
    advisor,
    token,
  });
};
