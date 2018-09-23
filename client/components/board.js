import React from "react";
import { styles } from "../styles";

import List from "./list";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.data.name ? props.data.name : "Untitled Board",
      lists: []
    };
  }

  changeName(newName) {
    this.setState({
      name: newName
    });
  }

  addList() {
    this.setState({
      lists: [
        ...this.state.lists,
        {
          id: this.state.lists.length,
          position: this.state.lists.length,
          name: `List ${this.state.lists.length + 1}`
        }
      ]
    });
  }

  deleteList(index) {
    this.setState({
      lists: this.state.lists.filter((list, id) => index !== id)
    });
  }

  changeListName(id, newName) {
    this.setState({
      lists: this.state.lists.map(list => {
        if (list.id === id) {
          list.name = newName;
        }
        return list;
      })
    });
  }

  moveElements(lists, id, newPosition) {
    const element = lists.find(list => list.id === id);
    const oldPosition = element.position;

    return lists.map(list => {
      if (list.id === id) {
        list.position = newPosition;
      } else {
        if (newPosition > oldPosition) {
          if (list.position <= newPosition) {
            list.position--;
          }
        } else {
          if (list.position >= newPosition) {
            list.position++;
          }
        }
      }
      return list;
    });
  }

  changePosition(id, newPosition) {
    this.setState({
      lists: this.moveElements(this.state.lists, id, newPosition)
    });
  }

  render() {
    return (
      <div style={styles.board}>
        <div>{this.props.data.name}</div>
        <div style={styles.boardLists}>
          {this.state.lists
            .sort((a, b) => {
              return a.position - b.position;
            })
            .map((listData, index) => (
              <List key={index} data={listData} />
            ))}
        </div>
      </div>
    );
  }
}
