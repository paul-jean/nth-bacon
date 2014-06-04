var ShortestPaths = require('../ShortestPaths.js');
var assert = require('assert');
var util = require('util');

var testPath = function(graph, source, dest, expectedPathIDs) {
  console.log('Test: actor graph =');
  console.log(graph);

  // build shortest paths to source node:
  var shortestPaths = ShortestPaths(graph, source);
  // retrieve the shortest path from destination node:
  var pathTo1 = shortestPaths.pathTo(dest);
  var ids = [];
  pathTo1.forEach(function(e) { ids.push(e.id); });
  assert.deepEqual(ids, expectedPathIDs, 'Test FAILED: path returned was ' + ids);

  console.log('Test SUCCEEDED.');
  console.log(util.format('Shortest path from %d to %d =', dest, source));
  shortestPaths.printPathTo(dest);
  console.log('\n++++++++++++++++++++++++++++++++++++++\n');
};

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

testPath(actorGraph, 3, 1, [1, 3]);

// example graph from pp 537 of
// "Algorithms", Sedgewick et al
actorGraph2 = {
  0: {2: '0-2', 1: '0-1', 5: '0-5'},
  1: {0: '1-0', 2: '1-2'},
  2: {0: '2-0', 1: '2-1', 3: '2-3', 4: '2-4'},
  3: {5: '3-5', 4: '3-4', 2: '3-2'},
  4: {3: '4-3', 2: '4-2'},
  5: {3: '5-3', 0: '5-0'}
};

testPath(actorGraph2, 0, 3, [3, 2, 0]);

testPath(actorGraph2, 0, 4, [4, 2, 0]);
