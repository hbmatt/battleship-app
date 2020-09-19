import React, { Component } from "react";

import { Player } from "../factories/Player";
import Board from "./layout/Board";

export class Game extends Component {
  constructor(props) {
    super(props);
    const player = new Player("player");
    const computer = new Player("computer");
    player.enemy = computer;
    computer.enemy = player;
    this.state = { player, computer };
    this.placeAllShips(player);
    this.placeAllShips(computer);
  }

  placeAllShips = (player) => {
    player.board.placeShip(3, [1, 1], "horizontal");
    player.board.placeShip(3, [1, 3], "horizontal");
    player.board.placeShip(5, [5, 1], "vertical");
    player.board.placeShip(4, [9, 1], "vertical");
    player.board.placeShip(2, [9, 10], "horizontal");
  };

  render() {
    return (
      <div className="container">
        <div className="col">
          <div className="grid">
            <Board player={this.state.player} />
          </div>
        </div>
        <div className="col">
          <div className="grid">
            <Board player={this.state.computer} />
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
