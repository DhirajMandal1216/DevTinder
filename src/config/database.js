const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://dhirajmandal1612:ntelvEXhmQaLE78K@cluster0.vtypvmj.mongodb.net/devTinder"
  );
};


module.exports = connectDb;
