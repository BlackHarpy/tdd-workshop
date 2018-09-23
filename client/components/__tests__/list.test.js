import React from "react";
import { shallow } from "enzyme";
import List from "../list";

describe("List Component", () => {
  let listComponent = {};

  beforeEach(() => {
    const listData = {
      id: 1,
      name: "Test List"
    };
    listComponent = shallow(<List data={listData} />);
  });

  it("Should render without throwing an error", () => {
    expect(shallow(<List data={{}} />)).toBeTruthy;
  });

  it("Should render with List data", () => {
    expect(listComponent.contains("Test List")).toEqual(true);
  });
});
