module.exports = function(actorGraph, baconName) {
  return new ShortestPaths(actorGraph, baconName);
};

/*
 * ShortestPaths(actorGraph, baconName) finds and stores the shortest paths from Kevin Bacon to all other actors
 * in the given actor graph.
 *
 * Uses breadth-first search to find the shortest paths in the actor graph.
 *
 * @param actorGraph: adjacency list giving actors (nodes) adjacent to actor A.
 * Stored as an associative array, where the key is a costar,
 * and the value is the movie (edge label) they have in common with actor A:
 *
 * actorGraph[actor_A] => {actor_B: movie_AB, actor_C: movie_AC, ... }
 *
 * @param baconName: Kevin Bacon's actor Name
*/

var ShortestPaths = function(actorGraph, baconName) {
  this.marked = {};
  this.edgeTo = {};
  this.baconName = baconName;

  // Do breadth-first search to populate the edgeTo table.
  var q = [];
  q.push(this.baconName);
  this.marked[this.baconName] = true;

  while(q.length > 0) {
    var actorName = q.shift();
    var adjacentActors = actorGraph[actorName];

    for (var adjActorName in adjacentActors) {
      if (!this.marked[adjActorName]) {
        this.marked[adjActorName] = true;
        q.push(adjActorName);
        this.edgeTo[adjActorName] = {
          actorName: actorName,
          movieName: adjacentActors[adjActorName]
        };
      }
    }
  }
};

ShortestPaths.prototype = {
  hasPathTo: function(actorName) {
    return this.marked[actorName];
  },

  /* Reconstruct the path from the given actor to Kevin Bacon.
   * @param actorName: actor node to start the path.
  */
  pathTo: function(actorName) {
    if (!this.hasPathTo(actorName)) { return null; }
    var path = [];
    var id = actorName;
    var edge = null;
    while (id != this.baconName) {
      path.push({edge: edge, id: id});
      edge = this.edgeTo[id];
      id = edge.actorName;
    }
    path.push({edge: edge, id: this.baconName});
    return path;
  },

  /* Print the path from the given actor to Kevin Bacon.
   * @param actorName: actor node to start the path.
  */
  printPathTo: function(actorName) {
    var path = this.pathTo(actorName);
    if (!path) return null;
    var pathString = "";
    path.forEach(function(e) {
      if(e.edge) pathString += " -(" + e.edge.movieName + ")-> ";
      pathString += e.id;
    });
    console.log(pathString);
  }

};
