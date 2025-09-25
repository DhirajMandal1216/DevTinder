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

// user api
app.get("/user", async (req, res) => {
  try {
    const userEmail = req.body.email;
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      res.status(404).send("Not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("Something went wrong.");
  }
});

// /feed
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("Something went wrong.");
  }
});

// delete user
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
  // const user = await User.findByIdAndDelete(userId)
  const user = await User.findByIdAndDelete({ _id: userId });
  res.send("user deleted successfully");
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
