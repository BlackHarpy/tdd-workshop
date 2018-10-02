import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Board from "../board";

export default class BoardDroppable extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }

  onDragEnd(result) {
    if (result.destination) {
      const dragEndHandler = {
        BOARD: () => {
          const listId = result.draggableId;
          const newPosition = result.destination.index;
          this.child.current.changeListPosition(listId, newPosition);
        },
        LIST: () => {
          const idCard = parseInt(result.draggableId.split("-")[1]);
          const idSourceList = parseInt(
            result.source.droppableId.split("-")[1]
          );
          const idDestinationList = parseInt(
            result.destination.droppableId.split("-")[1]
          );
          this.child.current.moveCardToList(
            idCard,
            idSourceList,
            idDestinationList
          );
        }
      };
      dragEndHandler[result.type]();
    }
  }

  render() {
    return (
      <DragDropContext onDragEnd={result => this.onDragEnd(result)}>
        <Droppable droppableId="board" direction="horizontal" type="BOARD">
          {(provided, snapshot) => (
            <Board
              ref={this.child}
              data={{ name: "Board 1" }}
              provided={provided}
            />
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
