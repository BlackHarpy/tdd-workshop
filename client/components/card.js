import React, { PropTypes } from "react";
import { styles } from "../styles";

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
    return <div style={styles.card}>{this.props.data.name}</div>;
  }
}
