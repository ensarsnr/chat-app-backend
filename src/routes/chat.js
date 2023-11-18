const express = require("express");
const router = express.Router();
const Conversation = require("../model/conversation");

router.post("/conversations/:conversationId", async (req, res) => {
  try {
    const conversationId = req.params.conversationId;
    const { sender, content } = req.body;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    const newMessage = {
      sender,
      content,
    };

    conversation.messages.push(newMessage);
    await conversation.save();

    return res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/get-conversations/:conversationId", async (req, res) => {
  //   const {conversationId} = req.params.conversationId;
  try {
    const conversationId = req.params.conversationId;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
