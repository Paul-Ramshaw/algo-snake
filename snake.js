import { getInputDirection } from './input.js';

export const SNAKE_SPEED = 40;
const snakeBody = [{ x: 10, y: 10 }];
let newSegments = 0;

var snakeTimer = 0;

export function update() {
  // snakeTimer sets the snake speed relative to the speed of robosnake
  if (snakeTimer >= 5) {
    addSegments();
    const inputDirection = getInputDirection();
    for (let i = snakeBody.length - 2; i >= 0; i--) {
      snakeBody[i + 1] = { ...snakeBody[i] };
    }
    // this is for the head of the snake
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;

    // reset snake timer
    snakeTimer = 0;
  } else {
    // add to snake timer
    snakeTimer = ++snakeTimer;
  }
}

export function draw(gameBoard) {
  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add('snake');
    gameBoard.appendChild(snakeElement);
  });
}

export function expandSnake(amount) {
  newSegments += amount;
}

export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false;
    return equalPositions(segment, position);
  });
}

export function getSnakeHead() {
  return snakeBody[0];
}

export function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true });
}

function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }
  newSegments = 0;
}
