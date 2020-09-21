import React, { Component } from "react";

import { Player } from "../factories/Player";
import Board from "./Board";
import Ships from "./Ships";
import Scoreboard from "./Scoreboard";

export class Game extends Component {
  constructor(props) {
    super(props);
    const player = new Player("player");
    const computer = new Player("computer");
    player.enemy = computer;
    computer.enemy = player;
    player.board.autoplaceShips();
    computer.board.autoplaceShips();
    this.state = {
      player,
      computer,
      turn: 1,
      completed: false,
    };
  }

  autoPlace = () => {
    let player = this.state.player;

    player.board.resetShips();
    player.board.autoplaceShips();

    this.setState({ player });
  };

  clearBoard = () => {
    let player = this.state.player;
    player.board.resetShips();

    this.setState({ player });
  };

  getAttack = (coord) => {
    if (this.state.turn % 2 === 0 || this.state.winner) return;

    let player = this.state.player;

    coord = coord.split(",");

    if (!player.isLegal(coord)) return;

    player.attack(coord);

    let computer = player.enemy;

    this.setState({ player, computer });

    this.isGameOver();
    this.computerAttack();
  };

  noAttack = () => {
    return;
  };

  computerAttack = () => {
    let computer = this.state.computer;

    if (computer.attack() === false) {
      this.computerAttack();
    } else {
      let turn = this.state.turn + 2;
      let player = computer.enemy;

      this.setState({ player, computer, turn });
    }
    this.isGameOver();
  };

  isGameOver = () => {
    let player = this.state.player;
    let computer = this.state.computer;

    if (player.board.areAllSunk()) {
      this.setState({ winner: computer.name, completed: true });
    } else if (computer.board.areAllSunk()) {
      this.setState({ winner: player.name, completed: true });
    } else {
      return false;
    }

    this.declareWinner();
  };

  declareWinner = () => {
    return this.state.winner ? "title" : "is-hidden";
  };

  render() {
    return (
      <div className="container">
        <h1 className={this.declareWinner()}>Winner: {this.state.winner}</h1>
        <div className="wrapper">
          <div className="ships-wrapper">
            <Ships autoPlace={this.autoPlace} clearBoard={this.clearBoard} />
          </div>
          <div className="board-wrapper">
            <div className="board">
              <Board
                player={this.state.player}
                getAttack={this.noAttack}
                completed={this.state.completed}
              />
            </div>
            <div className="board">
              <Board
                player={this.state.computer}
                getAttack={this.getAttack}
                completed={this.state.completed}
              />
            </div>
          </div>
          <div className="ships-wrapper">
            <Scoreboard computer={this.state.computer} />
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
