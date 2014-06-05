var ActorGraph = require('./ActorGraph');
var ShortestPaths = require('./ShortestPaths');
var readline = require('readline');

console.log('Building costar graph ... ');
var actorGraph = ActorGraph('./films');

var numActors = 0;
for (var a in actorGraph.graph) numActors ++;

console.log('Constructing shortest paths to Kevin Bacon from ' + numActors + ' actors ...');
var shortestPaths = ShortestPaths(actorGraph.graph, 'Kevin Bacon');

var markedCount = 0;
for (var m in shortestPaths.marked) markedCount ++;

console.log('Found ' + markedCount + ' actors connected to Kevin Bacon.');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var query = function () {
  var randomActorNum = Math.floor(Math.random() * numActors);
  var randomActor;
  var count = 0;
  var blankRegExp = /^\s*$/g;
  for (var a in actorGraph.graph) {
    if (count === randomActorNum) {
      randomActor = a;
      if (randomActor != 'Kevin Bacon') break;
    }
    count ++;
  }
  rl.question(
    '\nActor name (or hit enter for ' + randomActor + '): ',
    function(actor) {
      if (blankRegExp.test(actor)) {
        actor = randomActor;
      }
      if (! (actor in actorGraph.graph)) {
        console.log(actor + ' is not recognized. Try again ...');
      }
      else {
        var path = shortestPaths.pathTo(actor);
        if (!path) {
          console.log('There is no path from ' + actor + ' to Kevin Bacon!');
        } else {
          console.log(actor + ' has a Bacon number of ' + (path.length - 1) + ':');
          shortestPaths.printPathTo(actor);
        }
      }
      query();
    });
};

query();
