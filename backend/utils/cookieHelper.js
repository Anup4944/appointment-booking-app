export const getCookieOptions = (expire = true) => ({
  expires: expire
    ? new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000)
    : new Date(Date.now()),
  httpOnly: true,
  withCredentials: true,
  sameSite: "none",
  secure: true,
});
