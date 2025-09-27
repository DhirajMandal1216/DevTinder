const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/users");
const { validateSignUp } = require("./utils/validators/userValidation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();
const { userAuth } = require("./middleware/auth");
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    // 1. Custom business validation
    validateSignUp(req);

    // 2. Whitelist fields
    const { firstName, lastName, email, password } = req.body;

    // 3. Encrypt password (important!)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).send("User signup successfully");
  } catch (error) {
    res.status(500).send("ERROR : " + error.message);
  }
});

// login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate email format
    if (!validator.isEmail(email)) {
      throw new Error("Invalid input");
    }

    // find user is exist or not
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credential");
    }
    // validate password is correct or not
    const isValidPassword = user.validatePassword(password);
    if (isValidPassword) {
      // jwt token
      const token = await user.getJWT();
      // send cookie
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("login successfully!!");
    } else {
      throw new Error("invalid credential");
    }
  } catch (error) {
    res.status(500).send("ERROR : " + error.message);
  }
});

// profile
app.get("/profile", userAuth, async (req, res) => {
  const user = req.user;
  if (!user) {
    res.send("user not found");
  }
  res.send(user);
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
