var findPath = function(response, postData) {
  console.log("Handling findPath.");
  // TODO: find the shortest bacon path in the actor graph
  var body = postData; // echo what what sent from the client
  response.writeHead(200, {"Content-type": "text/html"});
  response.write(body);
  response.end();
};

exports.findPath = findPath;
