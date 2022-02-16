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
      winner: null,
    };
  }

  autoPlace = () => {
    if (this.state.turn !== 1) return;
    let player = this.state.player;

    player.board.resetShips();
    player.board.autoplaceShips();

    this.setState({ player });
  };

  clearBoard = () => {
    if (this.state.turn !== 1) return;
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

  resetGame = () => {
    let player = new Player('player');
    let computer = new Player('computer');
    player.enemy = computer;
    computer.enemy = player;
    player.board.autoplaceShips();
    computer.board.autoplaceShips();
    this.setState({
      player,
      computer,
      turn: 1,
      completed: false,
      winner: null,
    });
  }

  declareWinner = () => {
    if (this.state.winner === 'computer') {
      return (
        <div className="info">
          <h2 className="winner">Too bad, the computer won!</h2>
          <button onClick={this.resetGame} title="Play Again">
            <i className="fa fa-refresh"></i>
          </button>
        </div>
      )
    } else if (this.state.winner === 'player') {
      return (
        <div className="info">
          <h2 className="winner">Congrats! You've won!</h2>
          <button onClick={this.resetGame} title="Play Again">
            <i className="fa fa-refresh"></i>
          </button>
        </div>
      )
    }
  };

  render() {
    return (
      <div className="container">
        <h1>Battleship</h1>
        {this.declareWinner()}
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
