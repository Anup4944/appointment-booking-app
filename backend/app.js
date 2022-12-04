import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();

dotenv.config({
  path: "./config/config.env",
});

app.use(cookieParser());
app.use(express.json());
app.use(
  urlencoded({
    extended: true,
  })
);

// Import routes

import advisorRouter from "./routes/advisorRoute.js";

app.use("/api/v1", advisorRouter);

app.use(errorMiddleware);

export default app;
