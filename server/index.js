const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const cors = require("cors");

app.use(cors());

app.get("/ping", function(req, res) {
  return res.send("pong");
});

app.get("/pong", function(req, res) {
  return res.send("pang");
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT || 8080);
}

module.exports = app;
