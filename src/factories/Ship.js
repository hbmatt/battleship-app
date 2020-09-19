class Ship {
  constructor(length) {
    this.length = length;
    this.hits = Array(length).fill(0);
    this.sunk = false;
  }

  hit = (num) => {
    this.hits[num - 1] = 1;
  };

  isSunk = () => {
    this.sunk =
      this.hits.filter((i) => i === 1).length === this.length ? true : false;
  };
}

export { Ship };
