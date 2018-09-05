import React, { PropTypes } from "react";
export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.data.name,
      idList: props.data.idList
    };
  }

  changeName(newName) {
    this.setState({
      name: newName
    });
  }

  moveToList(newListId) {
    this.setState({
      idList: newListId
    });
  }

  render() {
    return <div>{this.props.data.name}</div>;
  }
}
