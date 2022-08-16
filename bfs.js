import { graph } from './graph.js';
import { food } from './food.js';
import { roboSnake } from './robo-snake.js';

export function bfs() {
  const startPosition = roboSnake.startPosition;
  const start = graph.setStart([startPosition.x, startPosition.y]);
  const end = graph.setEnd([food.x, food.y]);
  const queue = [];

  start.searched = true;
  queue.push(start);
  const searchPath = [];

  while (queue.length > 0 && start && end) {
    const current = queue[0];
    searchPath.push(current);

    if (current == end) {
      return {
        searchPath: searchPath,
        end: end,
      };
    }
    const edges = current.edges;

    for (let i = 0; i < edges.length; i++) {
      const neighbour = edges[i];

      if (!neighbour.searched) {
        neighbour.searched = true;
        neighbour.parent = current;
        queue.push(neighbour);
      }
    }
    queue.shift();
  }
}
