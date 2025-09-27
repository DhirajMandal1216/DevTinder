const express = require("express");
const connectDb = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routers/auth");
const profileRouter = require("./routers/profile");
const requestRouter = require("./routers/request");
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

// connect DB and listen server.
connectDb()
  .then(() => {
    console.log("Database connected");
    app.listen(7000, () => {
      console.log("Server is running on port 7777..");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected.");
  });
