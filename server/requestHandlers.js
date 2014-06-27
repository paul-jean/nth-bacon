var ActorGraph = require('../ActorGraph');
var ShortestPaths = require('../ShortestPaths');

console.log('Building costar graph ... ');
var actorGraph = ActorGraph('../films');

var numActors = 0;
for (var a in actorGraph.graph) numActors ++;
console.log('Constructing shortest paths to Kevin Bacon from ' + numActors + ' actors ...');
var shortestPaths = ShortestPaths(actorGraph.graph, 'Kevin Bacon');

var findPath = function(response, postData) {
  var actor = postData;
  var path = shortestPaths.pathTo(actor);
  var pathString = "";
  if (! (actor in actorGraph.graph)) {
    pathString = "ERROR: Actor " + actor + " not found in database!";
  }
  else if (path) {
    pathString = shortestPaths.pathString(actor);
  } else {
    pathString = "No path found from " + actor + " to Kevin Bacon.";
  }
  console.log("Handling findPath.");
  // TODO: find the shortest bacon path in the actor graph
  var body = postData; // echo what what sent from the client
  response.writeHead(200, {
    "Content-type": "text/html",
    "Access-Control-Allow-Origin": "*"
  });
  response.write(pathString);
  response.end();
};

exports.findPath = findPath;
