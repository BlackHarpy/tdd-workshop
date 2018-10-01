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
      idList: 1
    };

    expect(cardState).toEqual(expectedState);
  });
});
