import { Gameboard } from './Gameboard'

test('should create 10x10 grid array', () => {
  let board = new Gameboard();
  expect(board.grid[9].length).toBe(10);
})

test('should place ships horizontally at specific coordinates', () => {
  let board = new Gameboard();
  board.placeShip(3,[1,10],'horizontal');
  expect(board.grid[0][9]).not.toBe(0);
  expect(board.grid[1][9]).not.toBe(0);
  expect(board.grid[2][9]).not.toBe(0);
  expect(board.grid[3][9]).toBe(0);
})

test('should place ships vertically at specific coordinates', () => {
  let board = new Gameboard();
  board.placeShip(3,[10,1],'vertical');
  expect(board.grid[9][0]).not.toBe(0);
  expect(board.grid[9][1]).not.toBe(0);
  expect(board.grid[9][2]).not.toBe(0);
  expect(board.grid[9][3]).toBe(0);
})

test('should not place ships off grid', () => {
  let board = new Gameboard();
  board.placeShip(3,[10,10],'vertical');
  board.placeShip(3,[9,1],'horizontal');
  expect(board.grid[9][9]).toBe(0);
  expect(board.grid[8][0]).toBe(0);
})

test('should mark board with ship id', () => {
  let board = new Gameboard();
  board.placeShip(3,[1,10],'horizontal');
  board.placeShip(3,[1,1],'vertical');
  expect(board.grid[0][0]).toBe(2);
  expect(board.grid[0][1]).toBe(2);
  expect(board.grid[0][2]).toBe(2);
})

test('should add ship to ships array with all positions', () => {
  let board = new Gameboard();
  board.placeShip(5,[1,1],'vertical');
  expect(board.ships[0].ship.length).toBe(5);
  expect(board.ships[0].position).toEqual(['0, 0','0, 1','0, 2','0, 3', '0, 4']);
})

test('should not place ships in occupied position', () => {
  let board = new Gameboard();
  board.placeShip(3,[1,1],'horizontal');
  board.placeShip(3,[1,1],'vertical');
  expect(board.grid[0][0]).toBe(1);
})

test('should mark ship as hit', () => {
  let board = new Gameboard();
  board.placeShip(3,[1,1],'horizontal');
  board.receiveAttack([2,1]);
  expect(board.ships[0].ship.hits[1]).toBe(1);
})

test('should mark hit on grid', () => {
  let board = new Gameboard();
  board.placeShip(3,[1,1],'horizontal');
  board.receiveAttack([2,1]);
  expect(board.grid[1][0]).toBe('X');
})

test('should record missed shot', () => {
  let board = new Gameboard();
  board.placeShip(3,[1,1],'horizontal');
  board.receiveAttack([2,2]);
  expect(board.grid[1][1]).toBe('O');
})

test('should report not all ships sunk', () => {
  let board = new Gameboard();
  board.placeShip(3,[1,1],'horizontal');
  expect(board.areAllSunk()).toBeFalsy();
})

test('should report all ships sunk', () => {
  let board = new Gameboard();
  board.placeShip(3,[1,1],'horizontal');
  board.receiveAttack([1,1]);
  board.receiveAttack([2,1]);
  board.receiveAttack([3,1]);
  expect(board.areAllSunk()).toBeTruthy();
})

test('should add more than one ship', () => {
  let board = new Gameboard();
  board.placeShip(3, [1,1], 'horizontal');
  board.placeShip(3, [1,3], 'horizontal');
  board.placeShip(5, [5,1], 'vertical');
  board.placeShip(4, [9,1], 'vertical');
  board.placeShip(2, [9,10], 'horizontal');
  expect(board.ships.length).toBe(5);
})

