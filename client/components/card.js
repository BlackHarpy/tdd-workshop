import React, { PropTypes } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { styles } from "../styles";

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.data.name,
      idList: props.data.idList,
      isEditingName: false
    };
  }

  callOnDoubleClickHandler() {
    this.setState({
      isEditingName: true
    });
  }

  onEnterHandler(e) {
    if (e.key === "Enter") {
      this.setState({
        isEditingName: false
      });
      this.props.nameChangeHandler(
        this.props.data.idList,
        this.props.data.id,
        e.target.value
      );
    }
  }

  onDeleteClickHandler() {
    this.props.deleteHandler(this.props.data.idList, this.props.data.id);
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
            <div style={styles.card}>
              <div style={styles.cardInterior}>
                {this.state.isEditingName ? (
                  <input
                    style={{ width: 245 }}
                    type="text"
                    onKeyPress={e => {
                      this.onEnterHandler(e);
                    }}
                    defaultValue={this.props.data.name}
                  />
                ) : (
                  <div
                    onDoubleClick={() => {
                      this.callOnDoubleClickHandler();
                    }}
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                  >
                    {this.props.data.name}
                  </div>
                )}
                <button
                  style={{ ...styles.deleteButton, backgroundColor: "#c4e2e2" }}
                  onClick={() => {
                    this.onDeleteClickHandler();
                  }}
                >
                  x
                </button>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}
