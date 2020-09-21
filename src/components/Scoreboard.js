import React, { Component } from "react";

import Ship from "./Ship";

export class Scoreboard extends Component {
  state = {
    lengths: [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0],
    ],
  };

  setClass = (id) => {
    if (this.props.computer.board.ships[id].ship.isSunk()) {
      return "ship horizontal sunk";
    } else {
      return "ship horizontal";
    }
  };

  render() {
    return (
      <div className="ships scoreboard">
        <h2>Ships Sunk</h2>
        {this.state.lengths.map((length, id) => (
          <div className={this.setClass(id)} key={"class" + id}>
            <Ship
              key={id}
              id={id}
              length={length}
              direction={this.state.direction}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default Scoreboard;
