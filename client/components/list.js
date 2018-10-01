import React from "react";
import { styles } from "../styles";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Card from "./card";

export default class List extends React.Component {
  constructor(props) {
    super(props);
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
              <div ref={provided.innerRef} {...provided.dragHandleProps}>
                {this.props.data.name}
              </div>
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
