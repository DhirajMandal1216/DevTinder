const express = require("express");
const { adminAuth, userAuth } = require("./middleware/auth");
const app = express();

// middleware
app.use("/admin", adminAuth); // => for all admin routes 

// routes
app.get("/user",userAuth, (req, res) => { // => for specific routes 
  res.send("get data");
});

app.get("/admin/getData", (req, res) => {
  res.send("get data");
});

app.get("/admin/deleteData", (req, res) => {
  res.send("delete data");
});

app.listen(7000, () => {
  console.log("Server is running on port 7777..");
});
