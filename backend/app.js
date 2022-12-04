import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const app = express();

dotenv.config({
  path: "./config/config.env",
});

app.use(cookieParser());

// Import routes

export default app;
