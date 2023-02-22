export const sendToken = (advisor, statusCode, res, message) => {
  const token = advisor.generateToken();

  const options = {
    expiresIn: "1hr",
    httpOnly: true,
    secure: true,
  };

  console.log("JWT", token);

  res.status(statusCode).cookie("token", token, options).json({
    status: true,
    message,
    advisor,
    token,
  });
};
