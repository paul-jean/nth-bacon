module.exports = function(dirName) {
  return new ActorGraph(dirName);
};
var fs = require('fs');

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
