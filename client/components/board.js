import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { styles } from "../styles";

import KanbanService from "../services/kanban.service";

import List from "./list";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "My Board",
      lists: [],
      lastCardId: 0
    };
  }

  onDragEnd(result) {
    console.log(result);
    const listId = result.draggableId;
    const newPosition = result.destination.index;
    this.changeListPosition(listId, newPosition);
  }

  async componentDidMount() {
    this.setState({
      lists: await KanbanService.getBoardLists()
    });
  }

  changeName(newName) {
    this.setState({
      name: newName
    });
  }

  addList() {
    const result = KanbanService.addListToBoard(this.state.lists);
    console.log(result);
    this.setState({
      lists: result
    });
  }

  deleteList(idList) {
    this.setState({
      lists: KanbanService.deleteList(this.state.lists, idList)
    });
  }

  changeListName(id, newName) {
    this.setState({
      lists: KanbanService.changeListName(this.state.lists, id, newName)
    });
  }

  changeListPosition(id, newPosition) {
    this.setState({
      lists: KanbanService.changeListPosition(this.state.lists, id, newPosition)
    });
  }

  addCard(idList, newCard) {
    this.setState({
      lists: KanbanService.addCardToList(
        { lists: this.state.lists, lastCardId: this.state.lastCardId },
        idList,
        newCard
      )
    });
  }

  removeCard(idList, idCard) {
    this.setState({
      lists: KanbanService.removeCard(this.state.lists, idList, idCard)
    });
  }

  moveCardToList(idCard, idList, idNewList) {
    this.setState({
      lists: KanbanService.moveCardToList(
        this.state.lists,
        idCard,
        idList,
        idNewList
      )
    });
  }

  changeCardName(idList, idCard, newName) {
    this.setState({
      lists: KanbanService.changeCardName(
        this.state.lists,
        idList,
        idCard,
        newName
      )
    });
  }

  render() {
    return (
      <DragDropContext onDragEnd={result => this.onDragEnd(result)}>
        <Droppable droppableId="droppable-1" direction="horizontal">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={styles.board}
            >
              <div>{this.state.name}</div>
              <button onClick={() => this.addList()}>Add List</button>
              <div style={styles.boardLists}>
                {this.state.lists
                  .sort((a, b) => {
                    return a.position - b.position;
                  })
                  .map((listData, index) => (
                    <Draggable
                      draggableId={listData.id}
                      index={listData.position}
                      key={index}
                    >
                      {(provided, snapshot) => (
                        <List
                          key={index}
                          data={listData}
                          innerRef={provided.innerRef}
                          provided={provided}
                        />
                      )}
                    </Draggable>
                  ))}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
