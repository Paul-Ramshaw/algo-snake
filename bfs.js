import { graph } from './graph.js';
import { food } from './food.js';
import { roboSnake } from './robo-snake.js';

export function bfs() {
  var startPosition = roboSnake.startPosition;

  var start = graph.setStart([startPosition.x, startPosition.y]);
  var end = graph.setEnd([food.x, food.y]);
  var queue = [];

  start.searched = true;
  queue.push(start);
  var searchPath = [];

  while (queue.length > 0 && start && end) {
    var current = queue[0];
    searchPath.push(current);

    if (current == end) {
      // console.log(
      //   'Started at ' + start.value + ' Food found at ' + current.value
      // );
      return {
        searchPath: searchPath,
        end: end,
      };
    }
    var edges = current.edges;

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
