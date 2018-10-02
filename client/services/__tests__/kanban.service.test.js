import KanbanService from "../kanban.service";
import RequestService from "../request.service";

// function mockFetch(data) {
//   return jest.fn().mockImplementation(() =>
//     Promise.resolve({
//       ok: true,
//       json: () => Promise.resolve(data)
//     })
//   );
// }

jest.mock("../request.service", () => ({
  getBoard: jest.fn(() => []),
  postList: jest.fn(() => []),
  putList: jest.fn(() => []),
  deleteList: jest.fn(() => []),
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
      it("Should change list name", async () => {
        const inputList = [{ id: 0, position: 0, name: "List 1" }];

        const result = await KanbanService.changeListName(
          inputList,
          0,
          "List Test"
        );

        expect(result[0].name).toEqual("List Test");
      });

      describe("Add List Methods", () => {
        it("Should create a new list", async () => {
          RequestService.postList.mockReturnValue(
            Promise.resolve({ id: 1, name: "List 1" })
          );
          const result = await KanbanService.addListToBoard([]);
          expect(result).toHaveLength(1);
          expect(result[0].name).toEqual("List 1");
        });

        it("Should create two lists", async () => {
          const lists = [{ name: "List 1" }];
          RequestService.postList.mockReturnValue(
            Promise.resolve({ id: 1, name: "List 2" })
          );

          const result = await KanbanService.addListToBoard(lists);
          expect(result).toHaveLength(2);
          expect(result[1].name).toEqual("List 2");
        });
      });

      describe("Delete List Methods", () => {
        it("Should  delete a list", async () => {
          RequestService.deleteList.mockReturnValue(Promise.resolve(true));
          const lists = [{ id: 0 }, { id: 1 }];
          const result = await KanbanService.deleteList(lists, 0);
          expect(result).toHaveLength(1);
          expect(result[0].id).toEqual(1);
        });

        it("Should update lists positions when one is removed", async () => {
          RequestService.deleteList.mockReturnValue(Promise.resolve(true));

          const lists = [
            { id: 0, position: 0 },
            { id: 1, position: 1 },
            { id: 2, position: 2 }
          ];

          const result = await KanbanService.deleteList(lists, 0);

          expect(result).toHaveLength(2);
          expect(result[0].position).toEqual(0);
          expect(result[1].position).toEqual(1);
        });
      });

      describe("Move List Methods", () => {
        it("Should change list position", async () => {
          const inputLists = [
            { id: 0, position: 0 },
            { id: 1, position: 1 },
            { id: 2, position: 2 }
          ];

          const result = await KanbanService.changeListPosition(
            inputLists,
            0,
            2
          );

          const expected = [
            { id: 0, position: 2 },
            { id: 1, position: 0 },
            { id: 2, position: 1 }
          ];

          expect(result).toEqual(expected);
        });

        it("Should update lists positions after one is moved", async () => {
          const inputLists = [
            { id: 0, position: 0 },
            { id: 1, position: 1 },
            { id: 2, position: 2 },
            { id: 3, position: 3 }
          ];

          const result = await KanbanService.changeListPosition(
            inputLists,
            3,
            2
          );
          const expected = [
            { id: 0, position: 0 },
            { id: 1, position: 1 },
            { id: 2, position: 3 },
            { id: 3, position: 2 }
          ];

          expect(result.sort((a, b) => a.id - b.id)).toEqual(expected);
        });
      });
    });
  });

  describe("Card Methods", () => {
    describe("Basic Card Methods", () => {
      it("Should change a card name", async () => {
        RequestService.putCard.mockReturnValue(Promise.resolve(true));

        const lists = [
          {
            id: 0,
            name: "List 1",
            cards: [{ id: 0, name: "Card Test" }]
          }
        ];

        const result = await KanbanService.changeCardName(
          lists,
          0,
          0,
          "New Name"
        );
        expect(result[0].cards[0].name).toEqual("New Name");
      });
    });

    describe("Add Card Methods", () => {
      it("Should create a card in a list", () => {
        const board = {
          lists: [{ id: 0, cards: [] }, { id: 1, cards: [] }],
          idLastCard: 0
        };
        const result = KanbanService.addCardToList(board, 0, {
          name: "Task 1"
        });

        expect(result.lists[0].cards).toHaveLength(1);
        expect(result.lists[0].cards[0].id).toEqual(0);
        expect(result.lists[0].cards[0].name).toEqual("Task 1");
      });

      it("Should update idLastCard on add", () => {
        const board = {
          lists: [{ id: 0, cards: [] }, { id: 1, cards: [] }],
          idLastCard: 0
        };
        const result = KanbanService.addCardToList(board, 0, {
          name: "Task 1"
        });

        expect(result.idLastCard).toEqual(1);
      });

      it("Should mantain consistent id when adding cards to different lists", () => {
        const board = {
          lists: [
            {
              id: 0,
              position: 0,
              name: "List 1",
              cards: [{ id: 0, name: "Task 1" }]
            },
            { id: 1, position: 1, name: "List 2", cards: [] }
          ],
          idLastCard: 1
        };

        const result = KanbanService.addCardToList(board, 1, {
          name: "Task 2"
        });

        expect(result.lists[1].cards[0].id).toEqual(1);
      });
    });

    describe("Remove Card Methods", () => {
      it("Should remove a card on a list", async () => {
        RequestService.deleteCard.mockReturnValue(Promise.resolve(true));

        const lists = [{ id: 0, cards: [{ id: 0 }, { id: 1 }] }];

        const result = await KanbanService.removeCard(lists, 0, 0);

        expect(result[0].cards).toHaveLength(1);
        expect(result[0].cards[0].id).toEqual(1);
      });

      it("Should update remaining cards positions when a card is removed from a list", async () => {
        RequestService.deleteCard.mockReturnValue(Promise.resolve(true));

        const lists = [
          {
            id: 0,
            cards: [
              { id: 0, position: 0 },
              { id: 1, position: 1 },
              { id: 2, position: 2 }
            ]
          }
        ];

        const result = await KanbanService.removeCard(lists, 0, 1);

        expect(result[0].cards[0].position).toEqual(0);
        expect(result[0].cards[1].position).toEqual(1);
      });
    });

    describe("Move Card Methods", () => {
      it("Should move card to another list", async () => {
        const lists = [
          {
            id: 0,
            position: 0,
            cards: [{ id: 0 }, { id: 1 }]
          },
          { id: 1, position: 1, cards: [] }
        ];

        const result = await KanbanService.moveCardToList(lists, 0, 0, 1);

        expect(result[0].cards).toHaveLength(1);
        expect(result[1].cards).toHaveLength(1);
        expect(result[1].cards[0].id).toEqual(0);
      });

      it("Should set last position when moving a card to another list", async () => {
        const lists = [
          {
            id: 0,
            position: 0,
            cards: [{ id: 0, position: 0 }, { id: 1, position: 1 }]
          },
          { id: 1, position: 1, cards: [{ id: 2, position: 0 }] }
        ];

        const result = await KanbanService.moveCardToList(lists, 0, 0, 1);

        expect(result[0].cards).toHaveLength(1);
        expect(result[1].cards).toHaveLength(2);
        expect(result[1].cards[1].position).toEqual(1);
      });
    });
  });
});
