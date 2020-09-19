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
    if (this.state.turn % 2 === 0 || this.state.winner) return;

    coord = coord.split(",");
    this.state.player.attack(coord);
    let turn = this.state.turn + 1;
    this.setState({
      player: this.state.player,
      computer: this.state.computer,
      turn
    });

    this.isGameOver();
    this.computerAttack();
  };

  computerAttack = () => {
    if (this.state.computer.attack() === false) {
      this.computerAttack();
    } else {
      let turn = this.state.turn + 2;
      this.setState({
        player: this.state.player,
        computer: this.state.computer,
        turn
      });
    }
    this.isGameOver();
  };

  isGameOver = () => {
    if (this.state.player.board.areAllSunk()) {
      this.setState({ winner: this.state.computer.name });
    } else if (this.state.computer.board.areAllSunk()) {
      this.setState({ winner: this.state.player.name });
    } else {
      return false;
    }

    this.declareWinner();
  }

  declareWinner = () => {
    return (this.state.winner) ? "title" : "is-hidden"
  }

  render() {
    return (
      <div className="container">
        <h1 className={this.declareWinner()}>Winner: {this.state.winner}</h1>
        <div className="board-wrapper">
          <div className="board">
            <div className="grid">
              <Board player={this.state.player} getAttack={this.getAttack} />
            </div>
          </div>
          <div className="board">
            <div className="grid">
              <Board player={this.state.computer} getAttack={this.getAttack} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
