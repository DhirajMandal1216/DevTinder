const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxLength: 20,
      minLength: 3,
      trim: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("In valid Email" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Please enter strong Password " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      // coustom validation
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Enter valid gender.");
        }
      },
    },
    about: { type: String, default: "I am a devTender User" },
    photoUrl: {
      type: String,
      default: "http://localhost:6000",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "jhnlij34345jkhjkhk", {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (userTypePassword) {
  const user = this;
  const hashedPassword = user.password;
  const isValidPassword = await bcrypt.compare(
    userTypePassword,
    hashedPassword
  );

  return isValidPassword;
};

module.exports = mongoose.model("User", userSchema);
