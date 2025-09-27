const jwt = require("jsonwebtoken");
const User = require("../models/users");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      res.send("Invalid token!!!");
    }
    const decodeToken = jwt.verify(token, "jhnlij34345jkhjkhk");
    const { _id } = decodeToken;
    const user = await User.findById(_id);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    res.send(error.message)
  }
};

module.exports = { userAuth };
