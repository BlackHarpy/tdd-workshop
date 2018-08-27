import React from "react";
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
    return <div>{this.props.data.name}</div>;
  }
}
