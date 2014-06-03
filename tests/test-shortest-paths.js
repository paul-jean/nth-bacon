var ShortestPaths = require('../ShortestPaths.js');

/*
 * 1 --- (1-2) --- 2
 *  \           /
 *  (1-3)     (2-3)
 *      \     /
 *        \  /
 *          3
*/

var actorGraph = {
  1: {2: '1-2', 3: '1-3'},
  2: {1: '2-1', 3: '2-3'},
  3: {1: '3-1', 2: '3-2'}
};

// build shortest paths to node 3:
var shortestPaths = new ShortestPaths(actorGraph, 3);
// retrieve the shortest path from node 1:
var pathTo1 = shortestPaths.pathTo(1);

console.log(pathTo1);
console.log(shortestPaths.marked);
console.log(shortestPaths.edgeTo);
