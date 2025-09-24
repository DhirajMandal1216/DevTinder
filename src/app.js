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

// Wildcard route for 404(NOt found)
app.get(/.*/, (req, res) => {
  res.status(404).send("404 Not Found");
});

// Error handling middleware
app.use( (err, req, res, next) => {
  res.status(500).send("Something went wrong.");
});


app.listen(7000, () => {
  console.log("Server is running on port 7777..");
});
