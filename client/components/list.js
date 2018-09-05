import React from "react";
import { styles } from "../styles";

import Card from "./card";

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.data.id,
      name: props.data.name ? props.data.name : "Untitled List",
      idBoard: props.data.idBoard,
      position: props.data.position
    };
  }

  changeName(newName) {
    this.setState({ name: newName });
  }

  assignToBoard(idBoard) {
    this.setState({ idBoard });
  }

  changePosition(newPosition) {
    this.setState({ position: newPosition });
  }

  render() {
    return (
      <div style={styles.list}>
        <div>{this.state.name}</div>
        <div style={styles.listCards}>
          <Card data={{ name: "Test Card 1" }} />
          <Card data={{ name: "Test Card 2" }} />
        </div>
      </div>
    );
  }
}
