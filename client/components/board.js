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

  changeName(newName) {
    this.setState({
      name: newName
    });
  }

  async addList() {
    this.setState({
      lists: await KanbanService.addListToBoard(this.state.lists)
    });
  }

  async deleteList(idList) {
    this.setState({
      lists: await KanbanService.deleteList(this.state.lists, idList)
    });
  }

  async changeListName(id, newName) {
    this.setState({
      lists: await KanbanService.changeListName(this.state.lists, id, newName)
    });
  }

  async changeListPosition(id, newPosition) {
    this.setState({
      lists: await KanbanService.changeListPosition(
        this.state.lists,
        id,
        newPosition
      )
    });
  }

  async addCard() {
    this.setState({
      lists: await KanbanService.addCardToList(this.state.lists)
    });
  }

  async deleteCard(idList, idCard) {
    this.setState({
      lists: await KanbanService.removeCard(this.state.lists, idList, idCard)
    });
  }

  async moveCardToList(idCard, idList, idNewList) {
    this.setState({
      lists: await KanbanService.moveCardToList(
        this.state.lists,
        idCard,
        idList,
        idNewList
      )
    });
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
