import React, { Component } from "react";

export class Column extends Component {
  getClass = (cell) => {
    if (this.props.player.name === "computer") {
      switch (cell) {
        case "X":
          return "cell hit";
        case "O":
          return "cell miss";
        default:
          return (this.props.completed) ? "cell" : "cell open";
      }
    }

    switch (cell) {
      case 0:
        return "cell";
      case "X":
        return "cell hit";
      case "O":
        return "cell miss";
      default:
        return "cell ship";
    }
  };

  render() {
    return this.props.col
      .reverse()
      .map((cell, id) => (
        <div
          key={`${this.props.colId}${10 - id}`}
          className={this.getClass(cell)}
          onClick={this.props.getAttack.bind(
            this,
            `${this.props.colId},${10 - id}`
          )}
        ></div>
      ));
  }
}

export default Column;
