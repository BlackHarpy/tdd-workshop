const kanban = require("./kanban");
const dbLibrary = require("./kindaDatabaseService");

jest.mock("./kindaDatabaseService", () => ({
  insertList: jest.fn(() => []),
  selectListById: jest.fn(() => []),
  updateList: jest.fn(() => []),
  deleteList: jest.fn(() => []),
  insertCard: jest.fn(() => {}),
  updateCard: jest.fn(() => []),
  deleteCard: jest.fn(() => []),
  selectAllLists: jest.fn(() => []),
  selectCardsByList: jest.fn(() => []),
  selectCardsCount: jest.fn(() => {})
}));

const lists = [
  { id: 1, name: "To Do", position: 0 },
  { id: 2, name: "Doing", position: 1 },
  { id: 3, name: "Done", position: 2 }
];
const cards = [
  { id: 1, name: "Task 1", position: 0, idList: 3 },
  { id: 2, name: "Task 2", position: 1, idList: 3 },
  { id: 3, name: "Task 3", position: 0, idList: 2 },
  { id: 4, name: "Task 4", position: 0, idList: 1 }
];

describe("Kanban Module", () => {
  describe("List Methods", () => {
    it("Should return the lists of the board", async () => {
      dbLibrary.selectAllLists.mockReturnValue(
        new Promise(resolve => {
          resolve(lists);
        })
      );

      dbLibrary.selectCardsByList
        .mockReturnValueOnce(
          new Promise(resolve => {
            resolve([{ id: 4, name: "Task 4", position: 0, idList: 1 }]);
          })
        )
        .mockReturnValueOnce(
          new Promise(resolve => {
            resolve([{ id: 3, name: "Task 3", position: 0, idList: 2 }]);
          })
        )
        .mockReturnValueOnce(
          new Promise(resolve => {
            resolve([
              { id: 1, name: "Task 1", position: 0, idList: 3 },
              { id: 2, name: "Task 2", position: 1, idList: 3 }
            ]);
          })
        );

      const result = await kanban.getAllListsFromBoard();

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

      expect(result).toEqual({
        status: 200,
        data: expected
      });
    });
  });
});
