import React from "react";
import { styles } from "../styles";

import Card from "./card";

export default class List extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { provided, innerRef } = this.props;

    return (
      <div
        style={styles.list}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={innerRef}
      >
        <div>{this.props.data.name}</div>
        <div style={styles.listCards}>
          <Card data={{ name: "Test Card 1" }} />
          <Card data={{ name: "Test Card 2" }} />
        </div>
      </div>
    );
  }
}
