const express = require("express");
const router = express.Router();
const User = require("../model/user");
const Conversation = require("../model/conversation");
// getting user's name
router.post("/get-name", async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const name = user.name;
    const surname = user.surname;
    const pic = user.pic;
    const conversation = user.conversations;
    res.json({ name, surname, pic, conversation });
  } catch (error) {
    console.error("Error getting user's name:", error.message);
    res.status(500).json({ error: "Failed to get user's name." });
  }
});

router.get("/all-friends/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Kullanıcıyı bul
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı." });
    }

    const friendIds = user.friends;
    const friends = await User.find({ _id: { $in: friendIds } });

    res.json(friends);
  } catch (error) {
    console.error("Arkadaşları getirirken hata oluştu:", error.message);
    res.status(500).json({ error: "Arkadaşları getirme başarısız oldu." });
  }
});

// Added friends endpoint
// routes/user.js

router.post("/add-friends/:userId", async (req, res) => {
  const { userId } = req.params;
  const { friendIds } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Arkadaş listesine yeni arkadaşları ekle
    const uniqueFriendIds = [...new Set(user.friends.concat(friendIds))];
    user.friends = uniqueFriendIds;

    // Her bir arkadaş için konuşma başlat ve konuşma ID'sini arkadaşın conversations listesine ekle
    for (const friendId of friendIds) {
      const existingConversation = await Conversation.findOne({
        participants: { $all: [userId, friendId] },
      });

      if (!existingConversation) {
        const newConversation = new Conversation({
          participants: [userId, friendId],
          messages: [],
        });

        await newConversation.save();

        // Kullanıcının conversations listesine konuşma ID'sini ekle
        user.conversations.push(newConversation._id);
        await user.save();

        // Arkadaşın conversations listesine konuşma ID'sini ekle
        const friend = await User.findById(friendId);
        friend.conversations.push(newConversation._id);
        await friend.save();
      }
    }

    await user.save();

    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to add friends or start conversations." });
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
