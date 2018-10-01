import React, { PropTypes } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { styles } from "../styles";

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.data.name,
      idList: props.data.idList
    };
  }

  callOnDoubleClickHandler() {
    console.log("double click", this.props.data.name);
  }

  render() {
    return (
      <Draggable
        key={this.props.data.id}
        index={this.props.data.position}
        draggableId={`card-${this.props.data.id}`}
        type="CARD"
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div
              onDoubleClick={() => {
                this.callOnDoubleClickHandler();
              }}
              style={styles.card}
              ref={provided.innerRef}
              {...provided.dragHandleProps}
            >
              {this.props.data.name}
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}
