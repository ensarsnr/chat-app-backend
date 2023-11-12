const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/chatdb", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MongoDB'ye başarıyla bağlandı");
  })
  .catch((err) => {
    console.error("MongoDB bağlantı hatası:", err);
  });

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor`);
});
