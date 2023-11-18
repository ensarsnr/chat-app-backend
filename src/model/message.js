const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);

// const mongoose = require("mongoose");

// const MessageSchema = new mongoose.Schema(
//   {
//     sender: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     content: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// MessageSchema.virtual("senderName", {
//   ref: "User",
//   localField: "sender",
//   foreignField: "_id",
//   justOne: true,
// });

// MessageSchema.set("toObject", { virtuals: true });
// MessageSchema.set("toJSON", { virtuals: true });

// module.exports = mongoose.model("Message", MessageSchema);
