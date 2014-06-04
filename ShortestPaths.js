module.exports = function(actorGraph, baconID) {
  return new ShortestPaths(actorGraph, baconID);
};

/*
 * ShortestPaths(actorGraph, baconID) finds and stores the shortest paths from Kevin Bacon to all other actors
 * in the given actorGraph.
 *
 * actorGraph: gives actors (nodes) adjacent to actor A, each with the movie (edge label) they have in common with actor A,
 * using the adjacency list representation:
 * actorGraph[actorID_A] => {actorID_B: movieID_AB, actorID_C: movieID_AC, ... }
 *
 * baconID: Kevin Bacon's actor ID
 *
 * var paths = require('ShortestPaths');
 * // Is there a path to actor with id 1000?
 * var isPath = paths.hasPathTo(1000);
 * // Retrieve the shortest path to actor 1000:
 * var pathTo1000 = paths.pathTo(1000);
*/

var ShortestPaths = function(actorGraph, baconID) {
  this.marked = {}; // marked[id] => true if there is a path to actor id: {..., 1000: true, ...}
  this.edgeTo = {};
  // edgeTo[actorID_A] => {actorID: actorID_B, movieID: movie_AB}
  // is the edge from actor A to actor B via movie_AB: { ... 1000: {actorID: 2000, movieID: 100}, ... }
  this.baconID = baconID; // Kevin Bacon's actor ID

  var q = [];
  q.push(baconID);
  this.marked[this.baconID] = true;

  while(q.length > 0) {
    // console.log("q = " + q);
    var markedKeys = [];
    for (var k in this.marked) markedKeys.push(k);
    // console.log("marked = " + markedKeys);
    // console.log("edgeTo = ");
    // console.log(this.edgeTo);
    var actorID = q.shift();
    var adjacentActors = actorGraph[actorID];

    for (var adjActorID in adjacentActors) {
      if (!this.marked[adjActorID]) {
        this.marked[adjActorID] = true;
        q.push(adjActorID);
        this.edgeTo[adjActorID] = {
          actorID: actorID,
          movieID: adjacentActors[adjActorID]
        };
      }
    }
  }
};

ShortestPaths.prototype = {
  hasPathTo: function(actorID) {
    return this.marked[actorID];
  },

  pathTo: function(actorID) {
    if (!this.hasPathTo(actorID)) { return null; }
    var path = [];
    var id = actorID;
    var edge = null;
    while (id != this.baconID) {
      path.push({edge: edge, id: id});
      edge = this.edgeTo[id];
      id = edge.actorID;
    }
    path.push({edge: edge, id: this.baconID});
    return path;
  },

  printPathTo: function(actorID) {
    var path = this.pathTo(actorID);
    if (!path) return null;
    var pathString = "";
    path.forEach(function(e) {
      if(e.edge) pathString += " -(" + e.edge.movieID + ")-> ";
      pathString += e.id; // TODO translate id to actor name
    });
    console.log(pathString);
  }

};
