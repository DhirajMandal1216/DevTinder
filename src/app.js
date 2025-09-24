const express = require("express");

const app = express();

// middleware

// routes
app.get("/user", (req, res) => {
  throw new Error("ksdfkjskf");
  res.send("get data");
});
app.get("/user2", (req, res) => {
  try {
    throw new Error("ksdfkjskf");
    res.send("get data");
  } catch (error) {
    res.status(500).send("Something went wrong 02");
  }
});

app.use("/", (err, req, res, next) => {
  res.status(500).send("Something went wrong.");
});

app.listen(7000, () => {
  console.log("Server is running on port 7777..");
});
