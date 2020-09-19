class Ship {
  constructor(length) {
    this.length = length;
    this.hits = Array(length).fill(0);
  }

  hit = (num) => {
    this.hits[num - 1] = 1;
  };

  isSunk = () => {
    return this.hits.every((i) => i === 1) ? true : false;
  };
}

export { Ship };
