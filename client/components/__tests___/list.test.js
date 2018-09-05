import React from "react";
import { shallow } from "enzyme";
import List from "../list";

describe("List Component", () => {
  let listComponent = {};

  beforeEach(() => {
    const listData = {
      id: 1,
      name: "Test List",
      idBoard: 1,
      position: 0
    };
    listComponent = shallow(<List data={listData} />);
  });

  it("Should render without throwing an error", () => {
    expect(shallow(<List data={{}} />)).toBeTruthy;
  });

  it("Should render with List data", () => {
    expect(listComponent.contains("Test List")).toBe(true);
  });

  it("Should set default initial state", () => {
    listComponent = shallow(<List data={{}} />);
    expect(listComponent.state("name")).toEqual("Untitled List");
  });

  it("Should set initial state given props", () => {
    const componentState = listComponent.state();
    const expectedState = {
      id: 1,
      name: "Test List",
      idBoard: 1,
      position: 0
    };
    expect(componentState).toEqual(expectedState);
  });

  it("Should change List name", () => {
    listComponent.instance().changeName("New List Name");
    expect(listComponent.state("name")).toEqual("New List Name");
  });

  it("Should assign List to Board", () => {
    listComponent.instance().assignToBoard(2);
    expect(listComponent.state("idBoard")).toEqual(2);
  });

  it("Should change List of postition", () => {
    listComponent.instance().changePosition(2);
    expect(listComponent.state("position")).toEqual(2);
  });
});
