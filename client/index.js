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

fetch("http://localhost:8080/board")
  .then(function(resp) {
    resp.text().then(data => {
      console.log(data);
    });
  })
  .catch(function(error) {
    // If there is any error you will catch them here
  });

ReactDOM.render(<App />, document.getElementById("index"));
