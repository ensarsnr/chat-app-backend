const mongoose = require("mongoose");
const Conversation = require("./conversation");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    username: {
      type: String,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    conversations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
