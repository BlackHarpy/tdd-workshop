import React from "react";
import { shallow } from "enzyme";
import Board from "../board";
describe("Board Component", () => {
  it("should render without throwing an error", function() {
    expect(shallow(<Board data={{}} />)).toBeTruthy;
  });

  it("should render with Board data", () => {
    const dataProps = {
      name: "Test Board"
    };

    const boardComponent = shallow(<Board data={dataProps} />);

    expect(boardComponent.contains(<div>Test Board</div>)).toBe(true);
  });
});
