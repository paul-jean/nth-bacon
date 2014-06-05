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

var numActors = 0;
for (var a in actorGraph.graph) numActors ++;

var query = function () {
  var randomActorNum = Math.floor(Math.random() * numActors);
  var randomActor;
  var count = 0;
  for (var a in actorGraph.graph) {
    if (count === randomActorNum) {
      randomActor = a;
      if (randomActor != 'Kevin Bacon') break;
    }
    count ++;
  }
  rl.question(
    'Actor name (or hit enter for ' + randomActor + '): ',
    function(actor) {
      if (actor === '') {
        actor = randomActor;
      }
      console.log('Shortest path to ' + actor + ':');
      shortestPaths.printPathTo(actor);
      console.log('\n\n');
      query();
    });
};

query();
