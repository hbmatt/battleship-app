import React, { useState, useRef } from "react";

import { Player } from "../factories/Player";
import Board from "./Board";
import Ships from "./Ships";
import Scoreboard from "./Scoreboard";

const Game = () => {
  const [player, setPlayer] = useState(new Player("player"));
  const [computer, setComputer] = useState(new Player("computer"));
  const [turn, setTurn] = useState(1);
  const [completed, setCompleted] = useState(false);
  const [winner, setWinner] = useState(null);
  const [shipsPlaced, setShipsPlaced] = useState(false);
  player.enemy = computer;
  computer.enemy = player;
  computer.board.autoplaceShips();

  const autoPlace = () => {
    if (turn !== 1) return;
    let updatePlayer = player;
    updatePlayer.board.resetShips();
    updatePlayer.board.autoplaceShips();
    setPlayer({...updatePlayer});
    setShipsPlaced(true);
  };

  const clearBoard = () => {
    if (turn !== 1) return;
    let updatePlayer = player;
    player.board.resetShips();
    setPlayer({...updatePlayer});
    setShipsPlaced(false);
  };

  const getAttack = (coord) => {
    if (!shipsPlaced || turn % 2 === 0 || winner) return;

    let updatePlayer = player;
    coord = coord.split(",");
    if (!updatePlayer.isLegal(coord)) return;
    updatePlayer.attack(coord);

    let enemy = updatePlayer.enemy;
    setPlayer({...updatePlayer});
    setComputer({...enemy});

    isGameOver();
    computerAttack();
  };

  const noAttack = () => {
    return;
  };

  const computerAttack = () => {
    let updateComputer = computer;
    if (updateComputer.attack() === false) {
      computerAttack();
    } else {
      setTurn(turn + 2);
      let enemy = updateComputer.enemy;
      setPlayer({...enemy});
      setComputer({...updateComputer});
    }
    isGameOver();
  };

  const isGameOver = () => {
    if (shipsPlaced && player.board.areAllSunk()) {
      setWinner(computer.name);
      setCompleted(true);
    } else if (computer.board.areAllSunk()) {
      setWinner(player.name);
      setCompleted(true);
    } else {
      return false;
    }

    declareWinner();
  };

  const resetGame = () => {
    setPlayer(new Player('player'));
    setComputer(new Player('computer'));
    player.enemy = computer;
    computer.enemy = player;
    computer.board.autoplaceShips();
    setTurn(1);
    setCompleted(false);
    setWinner(null);
    setShipsPlaced(false);
  }

  const declareWinner = () => {
    if (winner === 'computer') {
      return (
        <div className="info">
          <h2 className="winner">Too bad, the computer won!</h2>
          <button onClick={resetGame} title="Play Again">
            <i className="fa fa-refresh"></i>
          </button>
        </div>
      )
    } else if (winner === 'player') {
      return (
        <div className="info">
          <h2 className="winner">Congrats! You've won!</h2>
          <button onClick={resetGame} title="Play Again">
            <i className="fa fa-refresh"></i>
          </button>
        </div>
      )
    }
  };

  const dragItem = useRef();
  const dragOverItem = useRef();

  const onDragStart = (e, position) => {
    if (shipsPlaced) return;
    dragItem.current = position;
  }

  const onDragEnter = (e, position) => {
    if (shipsPlaced) return;
    dragOverItem.current = position;
    console.log(dragOverItem.current);
  }

  const onDragLeave = (e) => {
    dragOverItem.current = null;
  }

  const drop = (e) => {
    if (shipsPlaced || !dragOverItem.current) return;
    let updatePlayer = player;
    updatePlayer.board.placeShip(dragItem.current[0], dragOverItem.current, dragItem.current[1]);

    setPlayer({...updatePlayer});
    if (player.board.ships.length === 5) setShipsPlaced(true);
    dragItem.current = null;
    dragOverItem.current = null;
  }

  return (
    <div className="container">
      <h1>Battleship</h1>
      {turn === 1 && 
        <div className="info">
          <h2>Place your ships, then click on your enemy's board to start the game!</h2>
        </div>
      }
      {declareWinner()}
      <div className="wrapper">
        <div className="ships-wrapper">
          <Ships autoPlace={autoPlace} clearBoard={clearBoard} onDragStart={onDragStart} onDragEnd={drop} />
        </div>
        <div className="board-wrapper">
          <div className="board">
            <Board
              player={player}
              getAttack={noAttack}
              completed={completed}
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
            />
          </div>
          <div className="board">
            <Board
              player={computer}
              getAttack={getAttack}
              completed={completed}
            />
          </div>
        </div>
        <div className="ships-wrapper">
          <Scoreboard computer={computer} />
        </div>
      </div>
    </div>
  );
}

export default Game;
