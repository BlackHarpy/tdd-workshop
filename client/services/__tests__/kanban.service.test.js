import KanbanService from "../kanban.service";

function mockFetch(data) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(data)
    })
  );
}

describe("Kanban Service", () => {
  it("Should fetch board data", async () => {
    window.fetch = mockFetch([{ id: 1, name: "List 1" }]);
    const result = await KanbanService.getBoardLists();
    expect(window.fetch).toHaveBeenCalledWith("http://localhost:8080/board");
    expect(result).toEqual([{ id: 1, name: "List 1" }]);
  });
  describe("List Methods", () => {
    describe("Basic List nmethods", () => {
      it("Should change list name", () => {
        const inputList = [{ id: 0, position: 0, name: "List 1" }];

        const result = KanbanService.changeListName(inputList, 0, "List Test");

        expect(result[0].name).toEqual("List Test");
      });

      describe("Add List Methods", () => {
        it("Should create a new list", () => {
          const result = KanbanService.addListToBoard([]);
          expect(result).toHaveLength(1);
          expect(result[0].name).toEqual("List 1");
        });

        it("Should create two lists", () => {
          const lists = [{ name: "List 1" }];

          const result = KanbanService.addListToBoard(lists);
          expect(result).toHaveLength(2);
          expect(result[1].name).toEqual("List 2");
        });
      });

      describe("Delete List Methods", () => {
        it("Should  delete a list", () => {
          const lists = [{ id: 0 }, { id: 1 }];
          const result = KanbanService.deleteList(lists, 0);
          expect(result).toHaveLength(1);
          expect(result[0].id).toEqual(1);
        });

        it("Should update lists positions when one is removed", () => {
          const lists = [
            { id: 0, position: 0 },
            { id: 1, position: 1 },
            { id: 2, position: 2 }
          ];

          const result = KanbanService.deleteList(lists, 0);

          expect(result).toHaveLength(2);
          expect(result[0].position).toEqual(0);
          expect(result[1].position).toEqual(1);
        });
      });

      describe("Move List Methods", () => {
        it("Should change list position", () => {
          const inputLists = [
            { id: 0, position: 0 },
            { id: 1, position: 1 },
            { id: 2, position: 2 }
          ];

          const result = KanbanService.changeListPosition(inputLists, 0, 2);

          const expected = [
            { id: 0, position: 2 },
            { id: 1, position: 0 },
            { id: 2, position: 1 }
          ];

          expect(result).toEqual(expected);
        });

        it("Should update lists positions after one is moved", () => {
          const inputLists = [
            { id: 0, position: 0 },
            { id: 1, position: 1 },
            { id: 2, position: 2 },
            { id: 3, position: 3 }
          ];

          const result = KanbanService.changeListPosition(inputLists, 3, 2);
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
      it("Should change a card name", () => {
        const lists = [
          {
            id: 0,
            name: "List 1",
            cards: [{ id: 0, name: "Card Test" }]
          }
        ];

        const result = KanbanService.changeCardName(lists, 0, 0, "New Name");
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
      it("Should remove a card on a list", () => {
        const lists = [{ id: 0, cards: [{ id: 0 }, { id: 1 }] }];

        const result = KanbanService.removeCard(lists, 0, 0);

        expect(result[0].cards).toHaveLength(1);
        expect(result[0].cards[0].id).toEqual(1);
      });

      it("Should update remaining cards positions when a card is removed from a list", () => {
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

        const result = KanbanService.removeCard(lists, 0, 1);

        expect(result[0].cards[0].position).toEqual(0);
        expect(result[0].cards[1].position).toEqual(1);
      });
    });

    describe("Move Card Methods", () => {
      it("Should move card to another list", () => {
        const lists = [
          {
            id: 0,
            position: 0,
            cards: [{ id: 0 }, { id: 1 }]
          },
          { id: 1, position: 1, cards: [] }
        ];

        const result = KanbanService.moveCardToList(lists, 0, 0, 1);

        expect(result[0].cards).toHaveLength(1);
        expect(result[1].cards).toHaveLength(1);
        expect(result[1].cards[0].id).toEqual(0);
      });

      it("Should set last position when moving a card to another list", () => {
        const lists = [
          {
            id: 0,
            position: 0,
            cards: [{ id: 0, position: 0 }, { id: 1, position: 1 }]
          },
          { id: 1, position: 1, cards: [{ id: 2, position: 0 }] }
        ];

        const result = KanbanService.moveCardToList(lists, 0, 0, 1);

        expect(result[0].cards).toHaveLength(1);
        expect(result[1].cards).toHaveLength(2);
        expect(result[1].cards[1].position).toEqual(1);
      });
    });
  });
});
