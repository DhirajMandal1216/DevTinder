const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/users");
const { validateSignUp } = require("./utils/validators/userValidation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();
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
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      // jwt token
      const token = await jwt.sign({ _id: user._id }, "jhnlij34345jkhjkhk");

      // send cookie
      res.cookie("token", token);
      res.send("login successfully!!");
    } else {
      throw new Error("invalid credential");
    }
  } catch (error) {
    res.status(500).send("ERROR : " + error.message);
  }
});

// profile
app.get("/profile", async (req, res) => {
  const cookies = req.cookies;
  const { token } = cookies;
  if (!token) {
    res.send("invalid token");
  }
  const decodeToken = jwt.verify(token, "jhnlij34345jkhjkhk");
  const id = decodeToken;
  const user = await User.findById(id);
  if (!user) {
    res.send("user not found");
  }
  res.send(user);
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

// update
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const ALLOW_Update = ["firstName", "lastName", "age", "gender", "photoUrl"];
    const isUpdateAllowed = Object.keys(data).every((k) => {
      ALLOW_Update.includes(k);
    });
    if (!isUpdateAllowed) {
      throw new Error("update not Allowed.");
    }
    if (data.skills.length > 10) {
      throw new Error("skill not added.");
    }
    const user = await User.findOneAndUpdate({ _id: userId }, data);
    console.log(user);
    res.status(200).send("data updated successfully");
  } catch (error) {
    res.status(500).send("Something went wrong.");
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
