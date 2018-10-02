import React from "react";
import ReactDOM from "react-dom";

import { DragDropContext } from "react-beautiful-dnd";

import Board from "./components/board";
import BoardDroppable from "./components/drag-n-drop/BoardDroppable";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ height: "100%" }}>
        <BoardDroppable />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("index"));
