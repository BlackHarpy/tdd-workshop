import React from "react";
import ReactDOM from "react-dom";

import Board from "./components/board";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ height: "100%" }}>
        <Board data={{ name: "Board 1" }} />
      </div>
    );
  }
}

// fetch("http://localhost:8080/ping")
//   .then(function(resp) {
//     resp.text().then(data => {
//       console.log(data);
//     });
//   })
//   .catch(function(error) {
//     // If there is any error you will catch them here
//   });

ReactDOM.render(<App />, document.getElementById("index"));
