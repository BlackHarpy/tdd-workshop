import React from "react";
import { shallow } from "enzyme";
import Board from "../board";

describe("Board Component", () => {
  it("Should render without throwing an error", () => {
    expect(shallow(<Board data={{}} />)).toBeTruthy;
  });

  it("Should set default initial state in component", () => {
    const boardComponent = shallow(<Board data={{}} />);

    expect(boardComponent.state("name")).toEqual("Untitled Board");
  });

  it("Should set initial state in component given a prop", () => {
    const dataProps = {
      name: "Board Test"
    };

    const boardComponent = shallow(<Board data={dataProps} />);

    expect(boardComponent.state("name")).toEqual("Board Test");
  });

  it("Should render with Board data", () => {
    const dataProps = {
      name: "Board Name"
    };

    const boardComponent = shallow(<Board data={dataProps} />);
    expect(boardComponent.contains(<div>Board Name</div>)).toBe(true);
  });

  it("Should change Board name", () => {
    const dataProps = {
      name: "Board Name"
    };

    const boardComponent = shallow(<Board data={dataProps} />);
    boardComponent.instance().changeName("New name");

    expect(boardComponent.state("name")).toEqual("New name");
  });
});
