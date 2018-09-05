import React from "react";
import { styles } from "../styles";

import List from "./list";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.data.name ? props.data.name : "Untitled Board"
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
        <div>{this.props.data.name}</div>

        <div style={styles.boardLists}>
          <List data={{}} />
          <List data={{}} />
        </div>
      </div>
    );
  }
}
