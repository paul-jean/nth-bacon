var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/findPath"] = requestHandlers.findPath;

server.start(router.route, handle);
