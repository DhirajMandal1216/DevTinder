const express = require("express");

const app = express();

app.use(
  "/hello",
  (req, res, next) => {
      console.log("Response1");
    //   res.send("THis is Hello 1");
    next();
  },
  (req, res, next) => {
      console.log("Response2");
    //   res.send("THis is Hello 2");
    next();
  },
  (req, res, next) => {
    console.log("Response1");
    res.send("THis is Hello 3");
  }
);

app.listen(7000, () => {
  console.log("Server is running on port 7777..");
});
