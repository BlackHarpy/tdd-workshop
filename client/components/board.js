import React from "react";

import { styles } from "../styles";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "My Board",
      lists: [],
      lastCardId: 0
    };
  }

  changeName(newName) {
    this.setState({
      name: newName
    });
  }

  render() {
    return (
      <div style={styles.board}>
        <div style={styles.boardHeader}>
          <div>{this.state.name}</div>
          <div style={styles.boardActions}>
            <a>Add List</a>
            <a>Add Card</a>
          </div>
        </div>
        <div>Here goes the List Components :)</div>
      </div>
    );
  }
}
