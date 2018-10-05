import React from "react";
import { shallow } from "enzyme";
import Board from "../board";

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
  });

  describe("Board methods", () => {
    it("Should render with Board data", () => {
      const boardComponent = shallow(
        <Board provided={{ droppableProps: {} }} />
      );
      expect(boardComponent.contains(<div>My Board</div>)).toEqual(true);
    });

    it("Should change Board name", () => {
      const boardComponent = shallow(
        <Board provided={{ droppableProps: {} }} />
      );
      boardComponent.instance().changeName("New name");

      expect(boardComponent.state("name")).toEqual("New name");
    });
  });
});
