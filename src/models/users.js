const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxLength:20,
    minLength:3,
    trim:true

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
  },
  password: {
    type: String,
    required: true,
    minLength:6
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
  about: { type: String ,default:"I am a devTender User"},
  photoUrl: {
    type: String,
    default:"http://localhost:6000"
  },
  skills: {
    type: [String],
  },
},{timestamps:true});

module.exports = mongoose.model("User", userSchema);
