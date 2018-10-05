import React from "react";
import { shallow } from "enzyme";
import Board from "../board";
import List from "../list";
import KanbanService from "../../services/kanban.service";

jest.mock("../../services/kanban.service", () => ({
  getBoardLists: jest.fn(() => []),
  changeListName: jest.fn(() => []),
  changeCardName: jest.fn(() => [])
}));

describe("Board Component", () => {
  describe("Basic tests", () => {
    it("Should render without throwing an error", () => {
      expect(shallow(<Board provided={{ droppableProps: {} }} />)).toBeTruthy;
    });

    it("Should set initial state in component given a prop", () => {
      const boardComponent = shallow(
        <Board provided={{ droppableProps: {} }} />
      );

      const expectedState = {
        name: "My Board",
        lists: [],
        lastCardId: 0
      };

      expect(boardComponent.state()).toEqual(expectedState);
    });

    it("Should retrieve server data on componentDidMount", () => {
      const boardComponent = shallow(
        <Board provided={{ droppableProps: {} }} />
      );
      boardComponent.instance().componentDidMount();
      expect(KanbanService.getBoardLists).toHaveBeenCalled();
    });
  });

  describe("Board methods", () => {
    it("Should render with Board data", () => {
      const boardComponent = shallow(
        <Board provided={{ droppableProps: {} }} />
      );
      expect(boardComponent.contains(<div>My Board</div>)).toEqual(true);
    });
  });

  describe("Lists methods", () => {
    describe("Basic List methods", () => {
      it("Should render lists in order", () => {
        const boardComponent = shallow(
          <Board provided={{ droppableProps: {} }} />
        );

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
        const boardComponent = shallow(
          <Board provided={{ droppableProps: {} }} />
        );
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
  });

  describe("Basic cards methods", () => {
    it("Should change card name", () => {
      const boardComponent = shallow(
        <Board provided={{ droppableProps: {} }} />
      );

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
});
