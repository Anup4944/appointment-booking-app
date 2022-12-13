import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { connectPassport } from "./utils/Provider.js";
import session from "express-session";

const app = express();

dotenv.config({
  path: "./config/config.env",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());

connectPassport();
app.use(cookieParser());
app.use(express.json());
app.use(
  urlencoded({
    extended: true,
  })
);

// Import routes

import advisorRouter from "./routes/advisorRoute.js";
import clientRouter from "./routes/clientRoute.js";
import passport from "passport";

app.use("/api/v1", advisorRouter);
app.use("/api/v1", clientRouter);

app.use(errorMiddleware);

export default app;
