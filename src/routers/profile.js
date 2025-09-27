const express = require("express");
const { userAuth } = require("../middleware/auth");
const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
 const user = req.user;
  if (!user) {
    res.send("user not found");
  }
  res.send(user);
});

module.exports = profileRouter;
