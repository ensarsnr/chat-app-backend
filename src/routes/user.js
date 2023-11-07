const express = require("express");
const router = express.Router();
const User = require("../model/user");

router.post("/add", (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });

  user
    .save()
    .then((savedUser) => {
      res.json(savedUser);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to add user." });
      console.log(err);
    });
});

// get all users
router.get("/all", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users." });
    console.log(err);
  }
});

module.exports = router;
