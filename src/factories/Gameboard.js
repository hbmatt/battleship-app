import { Ship } from "./Ship";

class Gameboard {
  constructor() {
    this.grid = {};
    for (let i = 0; i < 10; i++) {
      this.grid[i] = Array(10).fill(0);
    }
    this.ships = [];
  }

  placeShip = (length, coordinates, direction) => {
    const ship = new Ship(length);
    const x = coordinates[0] - 1;
    const y = coordinates[1] - 1;

    if (
      this.isOffBoard(direction, x, y, length) ||
      this.isOccupied(direction, x, y, length)
    ) {
      return;
    }

    const id = this.ships.length + 1;
    this.ships.push({ id, ship, position: [] });

    for (let i = 0; i < ship.length; i++) {
      if (direction === "horizontal") {
        this.grid[x + i][y] = id;
        this.ships[id - 1].position.push(`${x + i}, ${y}`);
      } else {
        this.grid[x][y + i] = id;
        this.ships[id - 1].position.push(`${x}, ${y + i}`);
      }
    }
  };

  receiveAttack = (coordinates) => {
    const x = coordinates[0] - 1;
    const y = coordinates[1] - 1;

    if (this.grid[x][y] !== 0) {
      const id = this.grid[x][y];
      const position = this.ships[id - 1].position.indexOf(`${x}, ${y}`);
      this.ships[id - 1].ship.hit(position + 1);
      this.grid[x][y] = "X";
    } else {
      this.grid[x][y] = "O";
    }
  };

  areAllSunk = () => {
    return this.ships.every((obj) => obj.ship.isSunk() === true) ? true : false;
  };

  isOffBoard(direction, x, y, length) {
    return (direction === "horizontal" && x + length < 10) ||
      (direction === "vertical" && y + length < 10)
      ? false
      : true;
  }

  isOccupied(direction, x, y, length) {
    for (let i = 0; i < length; i++) {
      if (direction === "horizontal") {
        if (this.grid[x + i][y] !== 0) {
          return true;
        }
      } else {
        if (this.grid[x][y + i] !== 0) {
          return true;
        }
      }
    }
    return false;
  }
}

export { Gameboard };
