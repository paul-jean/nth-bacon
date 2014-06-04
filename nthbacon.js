var ActorGraph = require('./ActorGraph');
var ShortestPaths = require('./ShortestPaths');

var actorGraph = ActorGraph('./films');
console.log(actorGraph);
var shortestPaths = ShortestPaths(actorGraph, 'Kevin Bacon');

shortestPaths.printPathTo('Johnny Depp');

