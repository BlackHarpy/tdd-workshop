const chai = require("chai");
const chaiHttp = require("chai-http");

const server = require("./index");
const kanban = require("./kanban");

jest.mock("./kanban", () => ({
  getAllListsFromBoard: jest.fn(() => [])
}));

chai.use(chaiHttp);

describe("Server index", () => {
  it("respond ping with pong", function(done) {
    chai
      .request(server)
      .get("/ping")
      .end(function(err, res) {
        expect(res.text).toEqual("pong");
        done();
      });
  });

  it("respond pong with pang", function(done) {
    chai
      .request(server)
      .get("/pong")
      .end(function(err, res) {
        expect(res.text).toEqual("pang");
        done();
      });
  });

  it("should respond with data", function(done) {
    kanban.getAllListsFromBoard.mockReturnValue(
      new Promise(resolve => {
        resolve({
          status: 200,
          data: [
            {
              id: 1,
              name: "To Do",
              position: 0,
              cards: [{ id: 4, name: "Task 4", position: 0, idList: 1 }]
            },
            {
              id: 2,
              name: "Doing",
              position: 1,
              cards: [{ id: 3, name: "Task 3", position: 0, idList: 2 }]
            },
            {
              id: 3,
              name: "Done",
              position: 2,
              cards: [
                { id: 1, name: "Task 1", position: 0, idList: 3 },
                { id: 2, name: "Task 2", position: 1, idList: 3 }
              ]
            }
          ]
        });
      })
    );

    const expected = [
      {
        id: 1,
        name: "To Do",
        position: 0,
        cards: [{ id: 4, name: "Task 4", position: 0, idList: 1 }]
      },
      {
        id: 2,
        name: "Doing",
        position: 1,
        cards: [{ id: 3, name: "Task 3", position: 0, idList: 2 }]
      },
      {
        id: 3,
        name: "Done",
        position: 2,
        cards: [
          { id: 1, name: "Task 1", position: 0, idList: 3 },
          { id: 2, name: "Task 2", position: 1, idList: 3 }
        ]
      }
    ];

    chai
      .request(server)
      .get("/board")
      .end(function(err, res) {
        expect(res.body).toEqual(expected);
        expect(res.status).toEqual(200);
        done();
      });
  });
});
