import React from "react";
import { shallow } from "enzyme";
import Board from "../board";
import List from "../list";

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
    expect(boardComponent.contains(<div>Board Name</div>)).toEqual(true);
  });

  it("Should change Board name", () => {
    const dataProps = {
      name: "Board Name"
    };

    const boardComponent = shallow(<Board data={dataProps} />);
    boardComponent.instance().changeName("New name");

    expect(boardComponent.state("name")).toEqual("New name");
  });

  it("Should render in order", () => {
    const dataProps = {
      name: "Board Name"
    };

    const boardComponent = shallow(<Board data={dataProps} />);
    boardComponent.setState({
      lists: [{ position: 0 }, { position: 2 }, { position: 1 }]
    });

    boardComponent.update();
    const lists = boardComponent.find(List);

    expect(lists.at(0).props().data.position).toEqual(0);
    expect(lists.at(1).props().data.position).toEqual(1);
    expect(lists.at(2).props().data.position).toEqual(2);
  });

  it("Should create a new list", () => {
    const dataProps = {
      name: "Board Name"
    };

    const boardComponent = shallow(<Board data={dataProps} />);
    boardComponent.instance().addList();
    boardComponent.update();
    expect(
      boardComponent.contains(
        <List data={{ id: 0, position: 0, name: "List 1" }} />
      )
    ).toEqual(true);
  });

  it("Should create two lists", () => {
    const dataProps = {
      name: "Board Name"
    };

    const boardComponent = shallow(<Board data={dataProps} />);
    boardComponent.instance().addList();
    boardComponent.instance().addList();
    boardComponent.update();

    expect(boardComponent.find(List)).toHaveLength(2);
  });

  it("Should delete a list", () => {
    const dataProps = {
      name: "Board Name"
    };

    const boardComponent = shallow(<Board data={dataProps} />);
    boardComponent.setState({
      lists: [{ id: 0 }, { id: 1 }, { id: 2 }]
    });

    boardComponent.instance().deleteList(1);

    boardComponent.update();
    const lists = boardComponent.find(List);

    expect(lists).toHaveLength(2);
    expect(lists.at(0).props().data.id).toEqual(0);
    expect(lists.at(1).props().data.id).toEqual(2);
  });

  it("Should change list name", () => {
    const dataProps = {
      name: "Board Name"
    };

    const boardComponent = shallow(<Board data={dataProps} />);
    boardComponent.setState({
      lists: [{ id: 0, position: 0, name: "List 1" }]
    });

    boardComponent.instance().changeListName(0, "List Test");

    boardComponent.update();

    expect(boardComponent.state("lists")[0].name).toEqual("List Test");
    expect(
      boardComponent
        .find(List)
        .at(0)
        .props().data.name
    ).toEqual("List Test");
  });

  it("Should change list position", () => {
    const dataProps = {
      name: "Board Name"
    };

    const boardComponent = shallow(<Board data={dataProps} />);
    boardComponent.setState({
      lists: [
        { id: 0, position: 0, name: "List 1" },
        { id: 1, position: 1, name: "List 2" },
        { id: 2, position: 2, name: "List 3" }
      ]
    });

    boardComponent.instance().changePosition(0, 2);
    boardComponent.update();

    const expectedListState = [
      { id: 0, position: 2, name: "List 1" },
      { id: 1, position: 0, name: "List 2" },
      { id: 2, position: 1, name: "List 3" }
    ];

    expect(boardComponent.state("lists").sort((a, b) => a.id - b.id)).toEqual(
      expectedListState
    );
  });

  it("Should change list position", () => {
    const dataProps = {
      name: "Board Name"
    };

    const boardComponent = shallow(<Board data={dataProps} />);
    boardComponent.setState({
      lists: [
        { id: 0, position: 0, name: "List 1" },
        { id: 1, position: 1, name: "List 2" },
        { id: 2, position: 2, name: "List 3" },
        { id: 3, position: 3, name: "List 4" }
      ]
    });

    boardComponent.instance().changePosition(3, 2);
    boardComponent.update();

    const expectedListState = [
      { id: 0, position: 0, name: "List 1" },
      { id: 1, position: 1, name: "List 2" },
      { id: 2, position: 3, name: "List 3" },
      { id: 3, position: 2, name: "List 4" }
    ];

    expect(boardComponent.state("lists").sort((a, b) => a.id - b.id)).toEqual(
      expectedListState
    );
  });
});
