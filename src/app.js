const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/users");
const app = express();

app.post("/signup", async (req, res) => {
  try {
    const user = new User({
      firstName: "Dhiraj",
      lastName: "mandal",
      email: "dhiraj@gamil.com",
      password: "Dhiraj@16",
      age: 20,
      gender: "Male",
    });

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
