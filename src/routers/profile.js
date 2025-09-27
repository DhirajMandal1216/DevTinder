const express = require("express");
const { userAuth } = require("../middleware/auth");
const { validateEditData } = require("../utils/validators/userValidation");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.send("user not found");
  }
  res.send(user);
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditData(req)) {
      return res.status(400).json({ message: "Invalid update request." });
    }
    const userData = req.user;
    Object.keys(req.body).forEach(
      (newData) => (userData[newData] = req.body[newData])
    );
    await userData.save();
    return res.status(200).json({
      message: `${userData.firstName} your data is update successfully.`,
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!!" });
  }
});

module.exports = profileRouter;
