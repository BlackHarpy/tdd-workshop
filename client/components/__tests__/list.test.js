import React from "react";
import { shallow, render } from "enzyme";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import List from "../list";

describe("List Component", () => {
  let listComponent = {};

  it("Should render without throwing an error", () => {
    expect(shallow(<List data={{}} />)).toBeTruthy;
  });

  it("Should render with List data", () => {
    const dataProps = {
      id: 1,
      name: "Test List",
      cards: []
    };
    const htmlListComponent = render(
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <List data={dataProps} provided={provided} />
          )}
        </Droppable>
      </DragDropContext>
    );
    expect(htmlListComponent.find("Test List")).toBeTruthy();
  });
});
