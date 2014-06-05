module.exports = function(dirName) {
  return new ActorGraph(dirName);
};
var fs = require('fs');

var ActorGraph = function(dirName) {
  var jsonFiles = fs.readdirSync(dirName);
  var numFiles = jsonFiles.length;
  // TODO: add progress bar for file loading
  this.graph = {};

  // for each movie in the database:
  for (var i = 0; i < jsonFiles.length; i ++) {
    var jsonContent = fs.readFileSync(dirName + '/' + jsonFiles[i]);
    var filmJSON = JSON.parse(jsonContent);
    // get the movie name:
    var movieName = filmJSON.film.name;
    // ... and the cast:
    var cast = filmJSON.cast.map(function(actor) { return actor.name; });
    // for each cast member:
    for (var j = 0; j < cast.length; j ++) {
      var actor = cast[j];
      if (! (actor in this.graph)) {
        this.graph[actor] = {};
      }
      // ... add a connection for each costar in the movie:
      for (var k = 0; k < cast.length; k ++) {
        var costar = cast[k];
        if (costar != actor) {
          // TODO: actor A and actor B can appear in multiple movies together
          // but this treats each costar connection as unique
          // Can this be handled in the adjacency list representation for the graph?
          /*
          if (this.graph[actor][costar]) {
            // found a multiple movies for actor and costar
            console.log('Actors ' + actor + ' and ' + costar + ' are in multiple movies:');
            console.log(this.graph[actor][costar]);
            console.log(movieName);
          }
          */
          this.graph[actor][costar] = movieName;
        }
      }
    }
  }
};
