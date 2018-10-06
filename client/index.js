import React from "react";
import ReactDOM from "react-dom";

import {
  ShoppingList,
  ShoppingListExtended
} from "../unit-testing-examples/shopping-list";

const shoppingList = [
  {
    name: "Strawberries",
    number: 5
  },
  {
    name: "Beer",
    number: 12
  },
  {
    name: "Cereal",
    number: 2
  },
  {
    name: "Milk",
    number: 1
  }
];
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ height: "100%" }}>
        <ShoppingList
          name="Maria"
          list={["Strawberries", "Beer", "Cereal", "Milk"]}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("index"));
