const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/chatdb";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connection to MongoDB"))
  .catch((err) => console.error("Connection error:", err));

module.exports = mongoose.connection;
