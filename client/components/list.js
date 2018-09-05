import React from "react";

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
    return <div />;
  }
}
