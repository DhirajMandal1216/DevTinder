const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/users");
const app = express();

app.use(express.json());
app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send("User signup successfully");
  } catch (error) {
    res.status(400).send("Error accor during user signup", error.message);
  }
});

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
