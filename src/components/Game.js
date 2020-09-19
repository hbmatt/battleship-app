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
    this.placeAllShips(player);
    this.placeAllShips(computer);
    this.state = { player, computer, turn: 1 };
  }

  placeAllShips = (player) => {
    player.board.placeShip(3, [1, 1], "horizontal");
    player.board.placeShip(3, [1, 3], "horizontal");
    player.board.placeShip(5, [5, 1], "vertical");
    player.board.placeShip(4, [9, 1], "vertical");
    player.board.placeShip(2, [9, 10], "horizontal");
  };

  getAttack = (coord) => {
    coord = coord.split(",");
    this.state.player.attack(coord);
    this.setState({
      player: this.state.player,
      computer: this.state.computer,
      turn: this.state.turn + 1,
    });

    this.computerAttack();
  };

  computerAttack = () => {
    if (this.state.computer.attack() === false) {
      this.computerAttack();
    } else {
      this.setState({
        player: this.state.player,
        computer: this.state.computer,
        turn: this.state.turn + 1,
      });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="col">
          <div className="grid">
            <Board player={this.state.player} getAttack={this.getAttack} />
          </div>
        </div>
        <div className="col">
          <div className="grid">
            <Board player={this.state.computer} getAttack={this.getAttack} />
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
