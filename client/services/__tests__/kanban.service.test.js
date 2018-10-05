import KanbanService from "../kanban.service";
import RequestService from "../request.service";

jest.mock("../request.service", () => ({
  getBoard: jest.fn(() => []),
  postList: jest.fn(() => []),
  putList: jest.fn(() => []),
  deleteList: jest.fn(() => []),
  postCard: jest.fn(() => []),
  putCard: jest.fn(() => []),
  deleteCard: jest.fn(() => [])
}));

describe("Kanban Service", () => {
  it("Should fetch board data", async () => {
    RequestService.getBoard.mockReturnValue(
      Promise.resolve([{ id: 1, name: "List 1" }])
    );
    const result = await KanbanService.getBoardLists();
    expect(result).toEqual([{ id: 1, name: "List 1" }]);
  });

  describe("List Methods", () => {
    describe("Basic List methods", () => {
      it("Should change list name", () => {
        const inputList = [{ id: 0, position: 0, name: "List 1" }];

        const result = KanbanService.changeListName(inputList, 0, "List Test");

        expect(result[0].name).toEqual("List Test");
      });
    });
  });

  describe("Card Methods", () => {
    describe("Basic Card Methods", () => {
      it("Should change a card name", () => {
        RequestService.putCard.mockReturnValue(Promise.resolve(true));

        const lists = [
          {
            id: 1,
            name: "List 1",
            cards: [{ id: 1, name: "Card Test" }]
          }
        ];

        const result = KanbanService.changeCardName(lists, 1, 1, "New Name");
        expect(result[0].cards[0].name).toEqual("New Name");
      });
    });
  });
});
