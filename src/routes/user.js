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
      res.status(500).json({ error: "Kullanıcı eklenemedi." });
    });
});

// get all users
router.get("/all", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Kullanıcılar getirilemedi." });
  }
});

module.exports = router;
