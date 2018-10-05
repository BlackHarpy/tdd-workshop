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

  async componentDidMount() {
    this.setState({
      lists: await KanbanService.getBoardLists()
    });
  }

  changeListName(id, newName) {
    this.setState({
      lists: KanbanService.changeListName(this.state.lists, id, newName)
    });
  }

  addList() {
    console.log("Add List function missing!");
  }

  deleteList(idList) {
    console.log("Delete List function missing!");
  }

  changeListPosition(id, newPosition) {
    console.log("Change list posisition function missiing!");
  }

  addCard() {
    console.log("Add Card function missiing!");
  }

  deleteCard(idList, idCard) {
    console.log("Delete Card function missing!");
  }

  moveCardToList(idCard, idList, idNewList) {
    console.log("Move card to list function missing!");
  }

  async changeCardName(idList, idCard, newName) {
    this.setState({
      lists: await KanbanService.changeCardName(
        this.state.lists,
        idList,
        idCard,
        newName
      )
    });
  }

  render() {
    const { provided } = this.props;
    return (
      <div style={styles.board}>
        <div style={styles.boardHeader}>
          <div>{this.state.name}</div>
          <div style={styles.boardActions}>
            <a onClick={() => this.addList()}>Add List</a>
            <a onClick={() => this.addCard()}>Add Card</a>
          </div>
        </div>

        <div
          style={styles.boardLists}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {this.state.lists
            ? this.state.lists
                .sort((a, b) => {
                  return a.position - b.position;
                })
                .map((listData, index) => (
                  <List
                    key={index}
                    data={listData}
                    provided={provided}
                    changeCardNameHandler={this.changeCardName.bind(this)}
                    deleteCardHandler={this.deleteCard.bind(this)}
                    changeNameHandler={this.changeListName.bind(this)}
                    deleteHandler={this.deleteList.bind(this)}
                  />
                ))
            : null}
        </div>
      </div>
    );
  }
}
