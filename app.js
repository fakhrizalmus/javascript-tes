const express = require("express");
const app = express();
const router = require("./routes/index.route.js");
const bp = require("body-parser");
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1", router);

app.get("/", (req, res) => {
  res.send("halo");
  console.log("test");
});

app.listen(PORT, () => {
  console.log(`dengar di ${PORT}`);
});
