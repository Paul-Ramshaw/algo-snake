import { randomGridPosition } from './grid.js';
import { graph } from './graph.js';
import { food } from './food.js';
import { bfs } from './bfs.js';

var roboSnakeTimer = 0;

// Robo-snake gets reset to a new position if the food gets eaten
export const roboSnake = {
  startPosition: [7, 3],
  searchPath: [],
  currentSearchPath: [],
  path: [],
  currentPath: [],
  gotFood: false,
};

export function update() {
  if (
    roboSnake.currentPath.length > 0 &&
    roboSnake.currentPath.length == roboSnake.path.length
  ) {
    roboSnake.gotFood = true;
  }

  // Push element from path to currentPath
  if (roboSnake.currentSearchPath.length === roboSnake.searchPath.length) {
    if (roboSnakeTimer >= 5) {
      if (roboSnake.currentPath < roboSnake.path) {
        roboSnake.currentPath.push(
          roboSnake.path[roboSnake.currentPath.length]
        );
      }
      roboSnakeTimer = 0;
    }
  }
  roboSnakeTimer = ++roboSnakeTimer;
  // Push element from searchPath to currentSearchPath
  if (roboSnake.currentSearchPath < roboSnake.searchPath) {
    roboSnake.currentSearchPath.push(
      roboSnake.searchPath[roboSnake.currentSearchPath.length]
    );
  }
}

export function draw(gameBoard) {
  if (roboSnake.currentSearchPath.length > 0) {
    roboSnake.currentSearchPath.forEach((search) => {
      const searchElement = document.createElement('div');
      searchElement.style.gridRowStart = search.value[1];
      searchElement.style.gridColumnStart = search.value[0];
      searchElement.classList.add('searched');
      gameBoard.appendChild(searchElement);
    });

    var currentSearchElement =
      roboSnake.currentSearchPath[roboSnake.currentSearchPath.length - 1];
    const searchElement = document.createElement('div');
    searchElement.style.gridRowStart = currentSearchElement.value[1];
    searchElement.style.gridColumnStart = currentSearchElement.value[0];
    searchElement.classList.add('search');
    gameBoard.appendChild(searchElement);
  }

  roboSnake.currentPath.slice(-5).forEach((step) => {
    const pathElement = document.createElement('div');
    pathElement.style.gridRowStart = step.value[1];
    pathElement.style.gridColumnStart = step.value[0];
    pathElement.classList.add('path');
    gameBoard.appendChild(pathElement);
  });
}

// Reset roboSnakes start position, searchPath and path.  Then call a new search.
export function newRoboSnake() {
  roboSnake.startPosition = randomGridPosition();
  roboSnake.searchPath = [];
  roboSnake.currentSearchPath = [];
  roboSnake.path = [];
  roboSnake.currentPath = [];
  newSearch(roboSnake.startPosition);
}
// Return robosnakes new searchPath and path
function newSearch() {
  const result = bfs() || {
    searchPath: [],
    end: { parent: null, searched: true },
  };
  const { searchPath } = result;
  const { end } = result;
  roboSnake.searchPath = searchPath || [];

  backTrack();

  // Calculate the shortest path to food
  function backTrack() {
    // var path = [];
    var parent = end.parent;

    if (parent == null) {
      console.log('no parent');
      return roboSnake.path;
    } else {
      while (parent !== null) {
        roboSnake.path.unshift(parent);
        console.log(roboSnake.path);
        var newParent = parent.parent;
        parent = newParent;
      }
    }
  }
  // reset the graph after search
  graph.nodes.map((node) => {
    node.searched = false;
    node.parent = null;
  });
}
