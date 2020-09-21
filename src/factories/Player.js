import { Gameboard } from "./Gameboard";

class Player {
  constructor(name) {
    this.name = name;
    this.enemy = "";
    this.board = new Gameboard();
    this.attacks = [];
    this.successfulAttack = [];
    this.attackQueue = [];
  }

  attack = (coordinates = this.getRandCoord()) => {
    if (this.name === "computer" && !this.isLegal(coordinates)) return false;
    if (this.successfulAttack.length > 1) {
      this.getAdjacentCoords();
      coordinates = this.attackQueue[0];
      this.attackQueue.shift();
    }

    this.attacks.push(`${coordinates[0] - 1}, ${coordinates[1] - 1}`);
    let success = this.enemy.board.receiveAttack(coordinates);

    if (this.name === "computer" && success) {
      this.successfulAttack = coordinates;
      this.attackQueue = [];
    }
  };

  isLegal(coordinates) {
    return this.attacks.find(
      (pos) => pos === `${coordinates[0] - 1}, ${coordinates[1] - 1}`
    )
      ? false
      : true;
  }

  getRandCoord() {
    return [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1];
  }

  getAdjacentCoords() {
    let offset = [[-1,0],[0,1],[1,0],[0,-1]];

    for (let i = 0; i < 4; i++) {
      let x = this.successfulAttack[0] + offset[i][0];
      let y = this.successfulAttack[1] + offset[i][1];
      
      if (x >= 1 && x <= 10 && y >= 1 && y <= 10 && this.isLegal([x,y])) {
        this.attackQueue.push([x,y]);
      }
    }
  }
}

export { Player };
