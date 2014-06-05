module.exports = function(actorGraph, baconID) {
  return new ShortestPaths(actorGraph, baconID);
};

/*
 * ShortestPaths(actorGraph, baconID) finds and stores the shortest paths from Kevin Bacon to all other actors
 * in the given actorGraph.
 *
 * @param actorGraph: gives actors (nodes) adjacent to actor A, each with the movie (edge label) they have in common with actor A,
 * using the adjacency list representation:
 * actorGraph[actorID_A] => {actorID_B: movieID_AB, actorID_C: movieID_AC, ... }
 *
 * @param baconID: Kevin Bacon's actor ID
*/

var ShortestPaths = function(actorGraph, baconID) {
  this.marked = {};
  this.edgeTo = {};
  this.baconID = baconID;

  var q = [];
  q.push(this.baconID);
  this.marked[this.baconID] = true;
  var markedCount = 1;

  while(q.length > 0) {
    var actorID = q.shift();
    var adjacentActors = actorGraph[actorID];

    for (var adjActorID in adjacentActors) {
      if (!this.marked[adjActorID]) {
        this.marked[adjActorID] = true;
        markedCount ++;
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
      pathString += e.id;
    });
    console.log(pathString);
  }

};
