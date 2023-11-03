const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("../src/db/database");
const userRoutes = require("./routes/user");

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor`);
});
