import { Ship } from './Ship';

const ship = new Ship(5);

test('create a ship of length 5', () => {
  expect(ship.length).toBe(5)
})

test('creates hit array equal to length', () => {
  expect(ship.hits).toEqual([0,0,0,0,0])
})

test('should change ship.hit', () => {
  ship.hit(5);
  expect(ship.hits).toEqual([0,0,0,0,1])
})

test('should return ship not sunk', () => {
  expect(ship.isSunk()).toBeFalsy()
})

test('should return ship sunk', () => {
  ship.hit(4);
  ship.hit(3);
  ship.hit(2);
  ship.hit(1);
  expect(ship.isSunk()).toBeTruthy();
})

