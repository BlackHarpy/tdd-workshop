import React from "react";
import { shallow, mount, render } from "enzyme";
import Card from "../card";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

describe("Card Component", function() {
  let cardComponent = {};

  beforeEach(() => {
    const dataProps = {
      id: 1,
      name: "Test Card",
      position: 0,
      idList: 1
    };
    cardComponent = shallow(
      <Card data={dataProps} provided={{ draggableProps: {} }} />
    );
  });

  it("Should render without throwing an error", () => {
    expect(
      shallow(<Card data={{}} provided={{ draggableProps: {} }} />)
    ).toBeTruthy();
  });

  it("Should render with Card data", () => {
    const dataProps = {
      id: 1,
      name: "Test Card",
      position: 0,
      idList: 1
    };
    const htmlCardComponent = render(
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <Card data={dataProps} provided={provided} />
          )}
        </Droppable>
      </DragDropContext>
    );
    expect(htmlCardComponent.text()).toEqual("Test Card");
  });

  it("Should set intial state", () => {
    const cardState = cardComponent.state();
    const expectedState = {
      name: "Test Card",
      idList: 1,
      isEditingName: false
    };

    expect(cardState).toEqual(expectedState);
  });

  it("Should set isEditingName on true on double click event", () => {
    const dataProps = {
      id: 1,
      name: "Test Card",
      position: 0,
      idList: 1
    };
    const cardComponent = shallow(<Card data={dataProps} provided={{}} />);

    cardComponent.instance().callOnDoubleClickHandler();

    expect(cardComponent.state("isEditingName")).toEqual(true);
  });

  it("Should set isEditing value on false after enter key press", () => {
    const dataProps = {
      id: 2,
      name: "Test Card",
      position: 0,
      idList: 1
    };
    const cardComponent = shallow(
      <Card data={dataProps} provided={{}} nameChangeHandler={() => {}} />
    );

    cardComponent.setState({ isEditingName: true });
    cardComponent.update();

    cardComponent
      .instance()
      .onEnterHandler({ key: "Enter", target: { value: "New Name" } });

    expect(cardComponent.state("isEditingName")).toEqual(false);
  });

  it("Should call deleteHandler on card delete button press", () => {
    const spy = jest.fn();
    const dataProps = {
      id: 2,
      name: "Test Card",
      position: 0,
      idList: 1
    };
    const cardComponent = shallow(
      <Card data={dataProps} provided={{}} deleteHandler={spy} />
    );

    cardComponent.instance().onDeleteClickHandler();

    expect(spy).toHaveBeenCalledWith(1, 2);
  });
});
