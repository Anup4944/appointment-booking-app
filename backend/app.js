import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { connectPassport } from "./utils/Provider.js";
import session from "express-session";
import cors from "cors";

const app = express();

dotenv.config({
  path: "./config/config.env",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    proxy: true,
    name: "googleToken",

    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "none",
    },
    // cookie: {
    //   secure: process.env.NODE_ENV === "development" ? false : true,
    //   httpOnly: process.env.NODE_ENV === "development" ? false : true,
    //   sameSite: process.env.NODE_ENV === "development" ? false : "none",
    // },
  })
);
app.use(cookieParser());

app.use(express.json());
app.use(
  urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");
connectPassport();

// Import routes

import advisorRouter from "./routes/advisorRoute.js";
import clientRouter from "./routes/clientRoute.js";
import bookingRouter from "./routes/bookingRoute.js";
import passport from "passport";

app.use("/api/v1", advisorRouter);
app.use("/api/v1", clientRouter);
app.use("/api/v1", bookingRouter);

app.use(errorMiddleware);

export default app;
