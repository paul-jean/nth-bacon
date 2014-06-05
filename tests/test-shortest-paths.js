var ShortestPaths = require('../ShortestPaths.js');
var ActorGraph = require('../ActorGraph');
var assert = require('assert');
var util = require('util');

var testSmallGraph = function(graph, source, dest, expectedPathIDs) {
  console.log('Test graph =');
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

testSmallGraph(actorGraph, 3, 1, [1, 3]);

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

testSmallGraph(actorGraph2, 0, 3, [3, 2, 0]);

testSmallGraph(actorGraph2, 0, 4, [4, 2, 0]);

var testBaconNumber = function(paths, actor, expectedLength) {
  console.log('Test graph: actor graph');
  var path = paths.pathTo(actor);
  assert.equal(path.length - 1, expectedLength);
  console.log('Test SUCCEEDED.');
  console.log(actor + '\'s Bacon number is ' + expectedLength);
  console.log(util.format('Shortest path from %s to Kevin Bacon =', actor));
  paths.printPathTo(actor);
  console.log('\n++++++++++++++++++++++++++++++++++++++\n');
};

var actorGraph = ActorGraph('../films');
var shortestPaths = ShortestPaths(actorGraph.graph, 'Kevin Bacon');

testBaconNumber(shortestPaths, 'Kevin Bacon', 0);

console.log('Collecting Bacon numbers frequencies ...');
var baconNumberLists = {};
for (var actor in actorGraph.graph) {
  var baconNumber = shortestPaths.pathTo(actor).length - 1;
  if (!baconNumberLists[baconNumber]) {
    baconNumberLists[baconNumber] = [];
  }
  baconNumberLists[baconNumber].push(actor);
}

var baconNumberCounts = {};
for (var bn in baconNumberLists) {
  baconNumberCounts[bn] = baconNumberLists[bn].length;
}

var baconNumbers = [];
for (var bn in baconNumberCounts) baconNumbers.push(bn);

console.log('Frequencies of Bacon numbers:');
console.log(baconNumberCounts);
console.log('\n++++++++++++++++++++++++++++++++++++++\n');

var maxBaconNumber = Math.max.apply(Math, baconNumbers);
for (var i = 0; i <= maxBaconNumber; i ++) {
  var randomActorIndex = Math.floor(Math.random() * baconNumberCounts[i]);
  var actor = baconNumberLists[i][randomActorIndex];
  console.log('Random actor with a Bacon number of ' + i + ':');
  console.log(actor);
  console.log('Shortest path to Kevin Bacon:');
  shortestPaths.printPathTo(actor);
  console.log('\n++++++++++++++++++++++++++++++++++++++\n');
}
