import React from "react";

import { shallow } from "enzyme";
import { ShoppingList } from "../shopping-list";

describe("Shopping List Component", () => {
  it("renders with no errors", () => {
    const wrapper = shallow(<ShoppingList name="" list={[]} />);
    expect(wrapper).toBeTruthy();
  });

  it("renders name correctly in shopping list title", () => {
    const wrapper = shallow(<ShoppingList name="Test" list={[]} />);
    expect(
      wrapper.containsMatchingElement(<h1>Shopping List for Test</h1>)
    ).toBeTruthy();
  });

  it("renders shopping list", () => {
    const wrapper = shallow(
      <ShoppingList name="Test" list={["Thing", "Stuff"]} />
    );
    const list = wrapper.find("li");
    expect(list.length).toEqual(2);
    expect(list.at(0).text()).toEqual("Thing");
    expect(list.at(1).text()).toEqual("Stuff");
  });
});

describe("Shopping List Extended Component", () => {});
