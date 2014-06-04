var ActorGraph = require('./ActorGraph');
var ShortestPaths = require('./ShortestPaths');

console.log('Building costar graph ... ');
var actorGraph = ActorGraph('./films');
// console.log(actorGraph);
console.log('Constructing shortest paths to Kevin Bacon ... ');
var shortestPaths = ShortestPaths(actorGraph.graph, 'Kevin Bacon');

// console.log('Path from Johnny Depp:');
// shortestPaths.printPathTo('Johnny Depp');

var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var query = function () {
  rl.question(
    "Type the name of an actor or actress, e.g. Johnny Depp:\n\n",
    function(actor) {
      console.log('Shortest path to ' + actor + ':');
      shortestPaths.printPathTo(actor);
      query();
    });
};
