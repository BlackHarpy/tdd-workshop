import React from "react";
import { shallow } from "enzyme";
import Board from "../board";
import List from "../list";
import KanbanService from "../../services/kanban.service";

jest.mock("../../services/kanban.service", () => ({
  getBoardLists: jest.fn(() => []),
  changeListName: jest.fn(() => []),
  addListToBoard: jest.fn(() => []),
  deleteList: jest.fn(() => []),
  changeListPosition: jest.fn(() => []),
  changeCardName: jest.fn(() => []),
  addCardToList: jest.fn(() => {}),
  removeCard: jest.fn(() => []),
  moveCardToList: jest.fn(() => [])
}));

describe("Board Component", () => {
  describe("Basic tests", () => {
    it("Should render without throwing an error", () => {
      expect(shallow(<Board />)).toBeTruthy;
    });

    it("Should set initial state in component given a prop", () => {
      const boardComponent = shallow(<Board />);

      const expectedState = {
        name: "My Board",
        lists: [],
        lastCardId: 0
      };

      expect(boardComponent.state()).toEqual(expectedState);
    });

    it("Should retrieve server data on componentDidMount", () => {
      const boardComponent = shallow(<Board />);
      boardComponent.instance().componentDidMount();
      expect(KanbanService.getBoardLists).toHaveBeenCalled();
    });
  });

  describe("Board methods", () => {
    it("Should render with Board data", () => {
      const boardComponent = shallow(<Board />);
      expect(boardComponent.contains(<div>My Board</div>)).toEqual(true);
    });

    it("Should change Board name", () => {
      const boardComponent = shallow(<Board />);
      boardComponent.instance().changeName("New name");

      expect(boardComponent.state("name")).toEqual("New name");
    });
  });

  describe("Lists methods", () => {
    describe("Basic List methods", () => {
      it("Should render lists in order", () => {
        const boardComponent = shallow(<Board />);
        boardComponent.setState({
          lists: [{ position: 0 }, { position: 2 }, { position: 1 }]
        });

        boardComponent.update();
        const lists = boardComponent.find(List);

        expect(lists.at(0).props().data.position).toEqual(0);
        expect(lists.at(1).props().data.position).toEqual(1);
        expect(lists.at(2).props().data.position).toEqual(2);
      });

      it("Should change list name", () => {
        const boardComponent = shallow(<Board />);
        boardComponent.setState({
          lists: [{ id: 0, position: 0, name: "List 1" }]
        });

        boardComponent.instance().changeListName(0, "List Test");

        expect(KanbanService.changeListName).toHaveBeenCalledWith(
          [{ id: 0, position: 0, name: "List 1" }],
          0,
          "List Test"
        );
      });
    });

    describe("Add List", () => {
      it("Should create a new list", () => {
        const boardComponent = shallow(<Board />);
        boardComponent.instance().addList();

        expect(KanbanService.addListToBoard).toHaveBeenCalledWith([]);
      });
    });

    describe("Remove List", () => {
      it("Should delete a list", () => {
        const boardComponent = shallow(<Board />);
        boardComponent.setState({
          lists: [{ id: 0 }, { id: 1 }, { id: 2 }]
        });

        boardComponent.instance().deleteList(1);

        expect(KanbanService.deleteList).toHaveBeenCalledWith(
          [{ id: 0 }, { id: 1 }, { id: 2 }],
          1
        );
      });
    });

    describe("Move List", () => {
      it("Should change list position", () => {
        const boardComponent = shallow(<Board />);
        boardComponent.setState({
          lists: [
            { id: 0, position: 0, name: "List 1" },
            { id: 1, position: 1, name: "List 2" },
            { id: 2, position: 2, name: "List 3" }
          ]
        });

        boardComponent.instance().changeListPosition(0, 2);
        expect(KanbanService.changeListPosition).toHaveBeenCalledWith(
          [
            { id: 0, position: 0, name: "List 1" },
            { id: 1, position: 1, name: "List 2" },
            { id: 2, position: 2, name: "List 3" }
          ],
          0,
          2
        );
      });
    });
  });

  describe("Basic cards methods", () => {
    it("Should change card name", () => {
      const boardComponent = shallow(<Board />);

      boardComponent.setState({
        lists: [
          {
            id: 0,
            name: "List 1",
            cards: [{ id: 0, name: "Card Test" }]
          }
        ]
      });

      boardComponent.instance().changeCardName(0, 0, "New Name");

      expect(KanbanService.changeCardName).toHaveBeenCalledWith(
        [{ id: 0, name: "List 1", cards: [{ id: 0, name: "Card Test" }] }],
        0,
        0,
        "New Name"
      );
    });
  });

  describe("Add cards methods", () => {
    it("Should add card to list", () => {
      const boardComponent = shallow(<Board />);

      boardComponent.setState({
        lists: [{ id: 0, cards: [] }, { id: 1, cards: [] }]
      });

      boardComponent.instance().addCard(0, { name: "Task 1" });
      expect(KanbanService.addCardToList).toHaveBeenCalledWith(
        { lists: [{ id: 0, cards: [] }, { id: 1, cards: [] }], lastCardId: 0 },
        0,
        { name: "Task 1" }
      );
    });
  });

  describe("Remove card methods", () => {
    it("Should remove card in a list", () => {
      const boardComponent = shallow(<Board />);

      boardComponent.setState({
        lists: [{ id: 0, cards: [{ id: 0 }, { id: 1 }] }]
      });

      boardComponent.instance().removeCard(0, 0);

      expect(KanbanService.removeCard).toHaveBeenCalledWith(
        [{ id: 0, cards: [{ id: 0 }, { id: 1 }] }],
        0,
        0
      );
    });
  });

  describe("Card moving tests", () => {
    it("Should move card to another list", () => {
      const boardComponent = shallow(<Board />);

      boardComponent.setState({
        lists: [
          {
            id: 0,
            position: 0,
            cards: [{ id: 0 }, { id: 1 }]
          },
          { id: 1, position: 1, cards: [] }
        ]
      });

      boardComponent.instance().moveCardToList(0, 0, 1);
      expect(KanbanService.moveCardToList).toHaveBeenCalledWith(
        [
          {
            id: 0,
            position: 0,
            cards: [{ id: 0 }, { id: 1 }]
          },
          { id: 1, position: 1, cards: [] }
        ],
        0,
        0,
        1
      );
    });
  });
});
