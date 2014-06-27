Testing the http server ...

Start the server:

```bash
[rule146@rule146: server]$ node index.js
Server has started.
```

Send a POST request with the actor name:

```bash
[rule146@rule146: server]$ curl --data "Johnny Depp" localhost:8888/findPath
Johnny Depp -(Alice in Wonderland)-> Michael Sheen -(Frost/Nixon)-> Kevin Bacon
```

^^^ The server responded with the path from the actor to Kevin Bacon.

The messages printed by the server indicated the request was routed to "/findPath"
as expected:

```bash
[rule146@rule146: server]$ node index.js
Building costar graph ...
Constructing shortest paths to Kevin Bacon from 26027 actors ...
Server has started.
Request for /findPath received.
Received POST data chunk 'Johnny Depp'.
About to route a request for /findPath
Handling findPath.
```
