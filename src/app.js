const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("THis is DashBoard");
});

app.get("/hello", (req, res) => {
  res.send("THis is Hello");
});

app.get("/test", (req, res) => {
  res.send("THis is test ");
});

app.listen(7000, () => {
  console.log("Server is running on port 7777..");
});
