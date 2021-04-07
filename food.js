import { onSnake, expandSnake } from './snake.js';
import { randomGridPosition } from './grid.js';
import { newRoboSnake, roboSnake } from './robo-snake.js';
import { addOnePoint, minusOnePoint, currentScore } from './score.js';

export var food = getRandomFoodPosition();
const EXPANSION_RATE = 2;

export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    food = getRandomFoodPosition();
    newRoboSnake();
    addOnePoint();
  } else if (roboSnake.gotFood) {
    food = getRandomFoodPosition();
    newRoboSnake();
    minusOnePoint();
    roboSnake.gotFood = false;
  }
}

export function draw(gameBoard) {
  const foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');
  gameBoard.appendChild(foodElement);

  if (roboSnake.gotFood) {
    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('path');
    gameBoard.appendChild(foodElement);
  }
}

function getRandomFoodPosition() {
  let newFoodPosition;
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
  }
  return newFoodPosition;
}
