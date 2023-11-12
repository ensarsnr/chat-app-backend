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

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    res.json({
      message: "Login successful!",
      user: { username: user.username },
      userId: { userId: user._id },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to log in." });
  }
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
