const express = require("express");
const { validateSignUp } = require("../utils/validators/userValidation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const User = require("../models/users");
const authRouter = express.Router();

// Signup
authRouter.post("/signup", async (req, res) => {
  try {
    // validation
    validateSignUp(req);

    // whitelist data
    const { firstName, lastName, email, password } = req.body;

    // encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user instance
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // save user data
    await user.save();

    // send request
    res.status(201).send("SignUp successful !!.");
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong", error: error.message });
  }
});

// Login
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate email
    if (!validator.isEmail(email)) {
      return res.status(400).send("Invalid input");
    }
    // find user from db
    const user = await User.findOne({ email });

    // check user is exist or not
    if (!user) {
      return res.status(400).send("Invalid credential");
    }

    // check password is valid or not
    const isValidPassword = await user.validatePassword(password);
    if (isValidPassword) {
      // generate jwt token
      const token = await user.getJWT();

      // send cookie
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      // send response
      return res.status(200).json({ message: "LogIn Successfully.!!" });
    } else {
      return res.status(400).send("Invalid credential");
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong", error: error.message });
  }
});

// logout
authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("Logout successful !!");
});

module.exports = authRouter;
