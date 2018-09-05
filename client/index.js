import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="foo">Bar</div>;
  }
}

fetch("http://localhost:8080/ping")
  .then(function(resp) {
    resp.text().then(data => {
      console.log(data);
    });
  })
  .catch(function(error) {
    // If there is any error you will catch them here
  });

ReactDOM.render(<App />, document.getElementById("index"));
