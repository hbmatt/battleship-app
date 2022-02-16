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
          return this.props.completed ? "cell" : "cell open";
      }
    }

    switch (cell) {
      case 1:
        return "cell carrier";
      case 2:
        return "cell battleship";
      case 3:
        return "cell destroyer";
      case 4:
        return "cell submarine";
      case 5:
        return "cell patrol";
      case "X":
        return "cell hit";
      case "O":
        return "cell miss";
      default:
        return "cell";
    }
  };

  getText = (cell) => {
    switch (cell) {
      case "O":
        return <i className="fa fa-circle"></i>;
      default:
        return "";
    }
  };

  render() {
    return [...this.props.col].reverse().map((cell, id) => (
      <div
        key={`${this.props.colId}${10 - id}`}
        className={this.getClass(cell)}
        onClick={this.props.getAttack.bind(
          this,
          `${this.props.colId},${10 - id}`
        )}
        onDragEnter={(e) => this.props.player.name === 'player' ? this.props.onDragEnter(e, [this.props.colId, 10 - id]) : ''}
      >
        {this.getText(cell)}
      </div>
    ));
  }
}

export default Column;
