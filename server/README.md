Testing the http server ...

Start the server:

```bash
[rule146@rule146: server]$ node index.js
Server has started.
```

Send a POST request:

```bash
[rule146@rule146: server]$ curl --data "echo this" localhost:8888/findPath
echo this
```
^^^ The server responded by echoing the POST data (which is all it does right now).

The messages printed by the server indicated the request was routed to "/findPath"
as expected:

```bash
[rule146@rule146: server]$ node index.js
Server has started.
Request for /findPath received.
Received POST data chunk 'echo this'.
About to route a request for /findPath
Handling findPath.
```
