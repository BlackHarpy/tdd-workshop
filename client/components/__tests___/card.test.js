import React from "react";
import { shallow, render, mount } from "enzyme";
import Card from "../card";
describe("Card Component", function() {
  let cardComponent = {};

  beforeEach(() => {
    const dataProps = {
      name: "Test Card",
      idList: 1
    };
    cardComponent = shallow(<Card data={dataProps} />);
  });

  it("Should render without throwing an error", () => {
    expect(shallow(<Card data={{}} />)).toBeTruthy();
  });

  it("Should render with Card data", () => {
    expect(cardComponent.contains(<div>Test Card</div>)).toBe(true);
  });

  it("Should set intial state", () => {
    const cardState = cardComponent.state();
    const expectedState = {
      name: "Test Card",
      idList: 1
    };

    expect(cardState).toEqual(expectedState);
  });

  it("Should change Card name", () => {
    cardComponent.instance().changeName("New Name");
    expect(cardComponent.state("name")).toEqual("New Name");
  });

  it("Should move Card to List", () => {
    cardComponent.instance().moveToList(2);
    expect(cardComponent.state("idList")).toEqual(2);
  });
});
