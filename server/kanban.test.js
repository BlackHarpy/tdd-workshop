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

    it("Should return new List on insert", async () => {
      dbLibrary.insertList.mockReturnValue(
        new Promise(resolve => {
          resolve({
            id: 5,
            name: "Test List",
            position: 0
          });
        })
      );
      const request = { body: { name: "Test List", position: 0 } };

      const result = await kanban.addList(request.body);

      expect(result).toEqual({
        status: 200,
        data: { id: 5, name: "Test List", position: 0, cards: [] }
      });
    });

    it("Should return error on insert exception", async () => {
      dbLibrary.insertList.mockReturnValue(Promise.reject());

      const newList = { name: "Test List", position: 0 };

      const result = await kanban.addList(newList);

      expect(result).toEqual({
        status: 500,
        error: "Database error"
      });
    });

    it("Should return new list on update", async () => {
      dbLibrary.updateList.mockReturnValue(
        new Promise(resolve => {
          resolve({
            id: 5,
            name: "Test List",
            position: 0
          });
        })
      );

      const body = { name: "Test List", position: 0 };

      const result = await kanban.updateList(5, body);

      expect(result).toEqual({
        status: 200,
        data: { id: 5, name: "Test List", position: 0 }
      });
    });

    it("Should return error on update exception", async () => {
      dbLibrary.updateList.mockReturnValue(Promise.reject());

      const body = { name: "Test List", position: 0 };

      const result = await kanban.updateList(5, body);

      expect(result).toEqual({
        status: 500,
        error: "Database error"
      });
    });

    it("Should delete a list", async () => {
      dbLibrary.deleteList.mockReturnValue(Promise.resolve());

      const result = await kanban.deleteList(5);

      expect(result).toEqual({
        status: 200
      });
    });

    it("Should return error on delete list exception", async () => {
      dbLibrary.deleteList.mockReturnValue(Promise.reject());

      const result = await kanban.deleteList(5);

      expect(result).toEqual({
        status: 500,
        error: "Database error"
      });
    });
  });

  describe("Cards Methods", () => {
    it("Should call Add Card DB Service with correct parameters", async () => {
      dbLibrary.selectCardsCount.mockReturnValue(Promise.resolve(10));

      const body = { idList: 3, position: 0 };

      await kanban.addCard(body);

      expect(dbLibrary.insertCard).toHaveBeenCalledWith({
        name: "Task 11",
        idList: 3,
        position: 0
      });
    });
    it("Should insert a card in a list", async () => {
      dbLibrary.lists = { length: 10 };
      dbLibrary.selectCardsCount.mockReturnValue(Promise.resolve(10));
      dbLibrary.insertCard.mockReturnValue(
        new Promise(resolve => {
          resolve({
            id: 10,
            name: "Task 10",
            position: 0,
            idList: 3
          });
        })
      );
      const body = { idList: 3, position: 0 };

      const result = await kanban.addCard(body);

      expect(result).toEqual({
        status: 200,
        data: { id: 10, name: "Task 10", position: 0, idList: 3 }
      });
    });

    it("Should return a error on insert card exception", async () => {
      dbLibrary.insertCard.mockReturnValue(Promise.reject());
      const body = { name: "Test List", position: 0 };

      const result = await kanban.addCard(3, body);

      expect(result).toEqual({
        status: 500,
        error: "Database error"
      });
    });

    it("Should update a card", async () => {
      dbLibrary.updateCard.mockReturnValue(
        new Promise(resolve => {
          resolve({ id: 10, name: "Test Card", position: 0, idList: 3 });
        })
      );

      const body = { name: "Test Card", position: 0, idList: 3 };

      const result = await kanban.updateCard(10, body);

      expect(result).toEqual({
        status: 200,
        data: { id: 10, name: "Test Card", position: 0, idList: 3 }
      });
    });

    it("Should return error on update exception", async () => {
      dbLibrary.updateCard.mockReturnValue(Promise.reject());

      const body = { name: "Test Card", position: 0, idList: 3 };

      const result = await kanban.updateCard(10, body);

      expect(result).toEqual({
        status: 500,
        error: "Database error"
      });
    });

    it("Should delete a card", async () => {
      dbLibrary.selectCardsByList.mockReturnValue(
        Promise.resolve([{ id: 1, cards: [] }])
      );
      dbLibrary.deleteCard.mockReturnValue(Promise.resolve());

      const result = await kanban.deleteCard(10);

      expect(result).toEqual({
        status: 200
      });
    });

    it("Should return error on delete card exception", async () => {
      dbLibrary.deleteCard.mockReturnValue(Promise.reject());

      const result = await kanban.deleteCard(10);

      expect(result).toEqual({
        status: 500,
        error: "Database error"
      });
    });
  });
});
