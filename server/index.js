const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const cors = require("cors");

const kanban = require("./kanban");

app.use(cors());
app.use(bodyParser.json());

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
    const response = await kanban.getAllListsFromBoard();
    res.status(response.status).json(response.data);
  } catch (e) {
    next(e);
  }
});

app.post("/board/lists", async (req, res, next) => {
  try {
    const response = await kanban.addList(req.body);
    res.status(response.status).json(response.data);
  } catch (e) {
    next(e);
  }
});

app.put("/board/lists/:listId", async (req, res, next) => {
  try {
    const response = await kanban.updateList(
      parseInt(req.params.listId),
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (e) {
    next(e);
  }
});

app.delete("/board/lists/:listId", async (req, res, next) => {
  try {
    const response = await kanban.deleteList(parseInt(req.params.listId));
    res.status(response.status).json({});
  } catch (e) {
    next(e);
  }
});

app.post("/board/lists/:listId/cards", async (req, res, next) => {
  try {
    const response = await kanban.addCard(
      parseInt(req.params.listId),
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (e) {
    next(e);
  }
});

app.put("/board/lists/:listId/cards/:cardId", async (req, res, next) => {
  try {
    const response = await kanban.updateCard(
      parseInt(req.params.cardId),
      req.body
    );
    res.status(response.status).json(response.data);
  } catch (e) {
    next(e);
  }
});

app.delete("/board/lists/:listId/cards/:cardId", async (req, res, next) => {
  try {
    const response = await kanban.deleteCard(parseInt(req.params.cardId));
    res.status(response.status).json({});
  } catch (e) {
    next(e);
  }
});

if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT || 8080);
}

module.exports = app;
