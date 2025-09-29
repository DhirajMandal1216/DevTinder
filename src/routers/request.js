const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const requestRouter = express.Router();
const User = require("../models/users");

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    // check status
    const allowedStatus = ["ignored", "interested"];
    if (!allowedStatus.includes(status)) {
      res.status(400).json({ message: `${status} type is incorrect` });
    }
    const user = await User.findById(toUserId);

    if (!user) {
      res.status(404).send("User not found");
    }

    // check the user already requested
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingConnectionRequest) {
      return res
        .status(400)
        .send({ message: "Connection request is already exist!!" });
    }

    const newRequest = new ConnectionRequest({ fromUserId, toUserId, status });
    const data = await newRequest.save();
    res.status(200).json({ message: "Request send successfully", data: data });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong", error: error.message });
  }
});

module.exports = requestRouter;
