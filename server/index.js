const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const cors = require("cors");

const kanban = require("./kanban");

app.use(cors());

const asyncMiddleware = async (req, res, next) => {
  const data = await PromiseBasedDataRequest(endpoint);
  req.data = data.json();
  next();
};

app.get("/ping", function(req, res) {
  return res.send("pong");
});

app.get("/pong", function(req, res) {
  return res.send("pang");
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.get("/board", async (req, res, next) => {
  try {
    const board = await kanban.getAllListsFromBoard();
    res.status(200).json(board);
  } catch (e) {
    //this will eventually be handled by your error handling middleware
    next(e);
  }
});

if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT || 8080);
}

module.exports = app;
