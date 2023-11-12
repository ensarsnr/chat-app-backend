const express = require("express");
const router = express.Router();
const User = require("../model/user");

// Added friends endpoint
router.post("/add-friends/:userId", async (req, res) => {
  const { userId } = req.params;
  const { friendIds } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // It checks to see if you have a friend with the same ID.
    const uniqueFriendIds = [...new Set(user.friends.concat(friendIds))];

    user.friends = uniqueFriendIds;

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to add friends." });
    console.error(err);
  }
});

// Attracts users based on the user's id

router.post("/all-friends", async (req, res) => {
  const { userId } = req.body;

  try {
    // Find the user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const friendIds = user.friends;
    const friends = await User.find({ _id: { $in: friendIds } });

    res.json(friends);
  } catch (error) {
    console.error("Error getting friends:", error.message);
    res.status(500).json({ error: "Failed to get friends." });
  }
});

module.exports = router;
