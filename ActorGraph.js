module.exports = function(dirName) {
  return new ActorGraph(dirName);
};
var fs = require('fs');

/*
 * ActorGraph(dirName): builds an adjacency list giving actors (nodes)
 * adjacent to other actors in the actor graph.
 * Stored as an associative array, where the key is an actor name (actor_A):
 *
 * actorGraph => {actor_A: {...}, actor_B: {...}, ... }
 *
 * ... and the value is another associative array with costars for keys
 * (actor_B, actor_C, ...), and movies (movie_AB, movie_AC) as values:
 *
 * actorGraph[actor_A] => {actor_B: movie_AB, actor_C: movie_AC, ... }
 *
 * ... where actor_A and actor_B costar in movie_AB,
 * actor_A and actor_C costar in movie_AC, etc.
 *
 * @param {string} dirName: directory containing JSON data files, one file per film.
 */

var ActorGraph = function(dirName) {
  var jsonFiles = fs.readdirSync(dirName);
  var numFiles = jsonFiles.length;
  this.graph = {};

  // For each movie in the database:
  for (var i = 0; i < numFiles; i ++) {
    // ... import the movie data:
    var jsonContent = fs.readFileSync(dirName + '/' + jsonFiles[i]);
    var filmJSON = JSON.parse(jsonContent);
    // ... get the movie name:
    var movieName = filmJSON.film.name;
    // ... and the cast:
    var cast = filmJSON.cast.map(function(actor) { return actor.name; });
    var numActors = cast.length;
    // For each cast member:
    for (var j = 0; j < numActors; j ++) {
      var actor = cast[j];
      if (! (actor in this.graph)) {
        this.graph[actor] = {};
      }
      // ... add a connection for each costar in this movie:
      for (var k = 0; k < numActors; k ++) {
        var costar = cast[k];
        if (costar != actor) {
          this.graph[actor][costar] = movieName;
        }
      }
    }
  }
};
