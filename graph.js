import { GRID_SIZE } from './grid.js';

// Create grid coordinates
const locations = [];
for (let x = 1; x < GRID_SIZE + 1; x++) {
  for (let y = 1; y < GRID_SIZE + 1; y++) {
    locations.push([x, y]);
  }
}

// Movement directions
const directions = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

// Neighbouring nodes
function neighbours(node) {
  const result = [];
  directions.map((direction) => {
    const neighbour = [node[0] + direction[0], node[1] + direction[1]];
    // console.log(neighbour);
    if (
      neighbour[0] >= 0 &&
      neighbour[0] <= GRID_SIZE &&
      neighbour[1] >= 0 &&
      neighbour[1] <= GRID_SIZE
    ) {
      result.push(neighbour);
    } else {
    }
  });
  return result;
}

// Node
class Node {
  constructor(location) {
    this.value = location;
    this.edges = [];
    this.searched = false;
    this.parent = null;
  }

  addEdge(neighbour) {
    this.edges.push(neighbour);
    neighbour.edges.push(this);
  }
}

// Graph
class Graph {
  constructor() {
    this.nodes = [];
    this.graph = {};
    this.end = null;
    this.start = null;
  }

  addNode(n) {
    // Node into array
    this.nodes.push(n);
    const location = n.value;
    // Node into "hash"
    this.graph[location] = n;
  }

  getNode(neighbour) {
    const n = this.graph[neighbour];
    return n;
  }

  setStart(node) {
    this.start = this.graph[node];
    return this.start;
  }
  setEnd(node) {
    this.end = this.graph[node];
    return this.end;
  }
}

export const graph = new Graph();

export function buildGraph() {
  for (let i = 0; i < locations.length; i++) {
    const n = new Node(locations[i]);

    // find edge locations
    let edgeLocations = neighbours(locations[i]);

    edgeLocations.map((edgeLocation) => {
      // console.log(edgeLocation);
      let neighbourNode = graph.getNode(edgeLocation);
      // console.log(neighbourNode);
      if (neighbourNode != undefined) {
        n.addEdge(neighbourNode);
      }
    });

    // Add node to graph
    graph.addNode(n);
  }
}
