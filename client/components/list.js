import React from "react";
import { styles } from "../styles";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Card from "./card";

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      this.props.changeNameHandler(this.props.data.id, e.target.value);
    }
  }

  onDeleteClickHandler() {
    this.props.deleteHandler(this.props.data.id);
  }

  render() {
    return (
      <Draggable
        draggableId={this.props.data.id}
        index={this.props.data.position}
        type="BOARD"
      >
        {(provided, snapshot) => (
          <div {...provided.draggableProps}>
            <div style={styles.list}>
              {this.state.isEditingName ? (
                <input
                  type="text"
                  onKeyPress={e => {
                    this.onEnterHandler(e);
                  }}
                  defaultValue={this.props.data.name}
                />
              ) : (
                <div
                  ref={provided.innerRef}
                  {...provided.dragHandleProps}
                  onDoubleClick={() => {
                    this.callOnDoubleClickHandler();
                  }}
                >
                  {this.props.data.name}
                  <button
                    onClick={() => {
                      this.onDeleteClickHandler();
                    }}
                  />
                </div>
              )}

              <Droppable droppableId={`list-${this.props.data.id}`} type="LIST">
                {(provided, snapshot) => (
                  <div
                    style={styles.listCards}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {this.props.data.cards.map((cardData, index) => (
                      <Card
                        key={cardData.id}
                        data={cardData}
                        provided={provided}
                        nameChangeHandler={this.props.changeCardNameHandler}
                        deleteHandler={this.props.deleteCardHandler}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}
