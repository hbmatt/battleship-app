import { Gameboard } from "./Gameboard";

class Player {
  constructor(name) {
    this.name = name;
    this.enemy = '';
    this.board = new Gameboard();
    this.attacks = [];
  }

  attack = (coordinates = this.getRandCoord()) => {
    if (this.name === 'computer' && !this.isLegal(coordinates)) return false;

    this.attacks.push(`${coordinates[0] - 1}, ${coordinates[1] - 1}`);
    this.enemy.board.receiveAttack(coordinates);
  }

  isLegal(coordinates) {
    return (this.attacks.find(pos => pos === `${coordinates[0] - 1}, ${coordinates[1] - 1}`)) ? true : false;
  }

  getRandCoord() {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
  }
}

export { Player }