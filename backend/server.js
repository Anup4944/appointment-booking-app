import app from "./app.js";
import { connectDb } from "./config/db.js";

connectDb();

app.get("/", (req, res, next) => {
  res.send("Working");
});

app.listen(process.env.PORT, () =>
  console.log(
    `Bankend server running at http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode`
  )
);
