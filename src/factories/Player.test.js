import { Player } from './Player'

let player = new Player('player1');
let enemy = new Player('computer');

test('should initialize with name', () => {
  expect(player.name).toMatch('player1');
})

test('should assign enemy', () => {
  player.enemy = enemy;
  enemy.enemy = player;
  expect(enemy.enemy).toEqual(player);
  expect(player.enemy).toEqual(enemy);
})

test('should generate gameboard', () => {
  expect(player.board).toBeTruthy();
})

test('should attack enemy gameboard', () => {
  enemy.board.placeShip(3,[1,1],'horizontal');
  player.attack([1,1]);
  expect(player.enemy.board.grid[0][0]).toBe("X");
})

test('should record made attacks', () => {
  expect(player.attacks).toEqual(['0, 0'])
})

test('should allow computer to make random attacks', () => {
  enemy.attack();
  expect(enemy.attacks[0]).toBeTruthy();
})

test('should not allow computer to shoot same coordinate twice', () => {
  enemy.attack([1,1]);
  expect(enemy.attack([1,1])).toBeFalsy();
})

test('computer should attack adjacent spots next when attack successful', () => {
  player = new Player('player1');
  enemy = new Player('computer');
  player.enemy = enemy;
  enemy.enemy = player;

  player.board.placeShip(4,[7,1],'horizontal');
  enemy.attack([7,1]);
  enemy.attack();
  enemy.attack();
  enemy.attack();
  expect(enemy.attacks).toContain('5, 0');
  expect(enemy.attacks).toContain('6, 1');
  expect(enemy.attacks).toContain('7, 0');
})



