const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
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
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // "User" modeline referans verildi
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
