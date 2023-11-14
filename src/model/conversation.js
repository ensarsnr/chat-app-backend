const mongoose = require("mongoose");
const Message = require("./message");

const ConversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [Message.schema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
