import React from "react";

export class ShoppingList extends React.Component {
  render() {
    return (
      <div style={{ color: "white" }}>
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          {this.props.list.map((article, index) => {
            return <li key={index}>{article}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export class ShoppingListExtended extends React.Component {
  render() {
    return (
      <div style={{ color: "white" }}>
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          {this.props.list
            .sort((a, b) => {
              return b.number - a.number;
            })
            .map((article, index) => {
              return (
                <li key={index}>
                  {article.name} - {article.number}
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}
