## How many costar connections to Kevin Bacon?

This node.js app generates an actor costar graph from
a movie database, and computes the shortest path from
any actor to Kevin Bacon using a breadth-first graph search.

## Usage

Run `node nthbacon.js` to initialize the costar graph:

```bash
[rule146@rule146: nth-bacon]$ node nthbacon.js
Building costar graph ...
Constructing shortest paths to Kevin Bacon from 26027 actors ...
Found 26027 actors connected to Kevin Bacon.
```

You will be prompted to enter an actor name:

```bash
Actor name (or hit enter for Michael Maloney): Johnny Depp
Johnny Depp has a Bacon number of 2:
Johnny Depp -(Alice in Wonderland)-> Michael Sheen -(Frost/Nixon)-> Kevin Bacon
```

Or you can simply hit enter to choose a randomly chosen actor
from the costar graph:

```bash
Actor name (or hit enter for Sandra Francis):
Sandra Francis has a Bacon number of 3:
Sandra Francis -(Tycus)-> Randy Quaid -(The Adventures of Rocky & Bullwinkle)-> John Goodman -(Death Sentence)-> Kevin Bacon
```


The costar connections leading from the chosen actor to Kevin Bacon are shown,
along with the actor's Bacon number (number of graph edges in the shortest path
from the actor to Kevin Bacon in the costar graph). The connections (graph edges)
are labeled with the movie the actors were in together.

More examples:

```bash
Actor name (or hit enter for Michael Moriarty):
Michael Moriarty has a Bacon number of 3:
Michael Moriarty -(Neverwas)-> Vera Farmiga -(Joshua)-> Sam Rockwell -(Frost/Nixon)-> Kevin Bacon

Actor name (or hit enter for Yuen Qiu):
Yuen Qiu has a Bacon number of 3:
Yuen Qiu -(Looking for Jackie)-> Nan Yu -(Speed Racer)-> John Goodman -(Death Sentence)-> Kevin Bacon

Actor name (or hit enter for Felix Justice):
Felix Justice has a Bacon number of 2:
Felix Justice -(Gospel Hill)-> Chris Ellis -(Apollo 13)-> Kevin Bacon

Actor name (or hit enter for Steve Winwood):
Steve Winwood has a Bacon number of 3:
Steve Winwood -(Red, White and Blues)-> Jeff Beck -(Twins)-> Kelly Preston -(Death Sentence)-> Kevin Bacon
```

## How it works

The app uses breadth-first search (BFS) in the costar graph to build up
a data structure representing the shortest path from the given actor to Kevin Bacon.

## Data

The films used to construct the graph are in the `films` directory. There is
one JSON-formatted file per film:

```bash
[rule146@rule146: films]$ pwd
/Users/rule146/Documents/nth-bacon/films

[rule146@rule146: films]$ ls -1 | head
10009.json
10010.json
100122.json
100196.json
100241.json
10025.json
10027.json
100329.json
10033.json
10034.json
```

## Test suite

There is a test suite in the `tests` directory. It tests some custom graphs
in addition to finding actors with a range of different Bacon numbers.

```bash
[rule146@rule146: nth-bacon]$ cd tests/
[rule146@rule146: tests]$ node test-shortest-paths.js
Test graph =
{ '1': { '2': '1-2', '3': '1-3' },
  '2': { '1': '2-1', '3': '2-3' },
  '3': { '1': '3-1', '2': '3-2' } }
Test SUCCEEDED.
Shortest path from 1 to 3 =
1 -(3-1)-> 3

++++++++++++++++++++++++++++++++++++++

Test graph =
{ '0': { '1': '0-1', '2': '0-2', '5': '0-5' },
  '1': { '0': '1-0', '2': '1-2' },
  '2': { '0': '2-0', '1': '2-1', '3': '2-3', '4': '2-4' },
  '3': { '2': '3-2', '4': '3-4', '5': '3-5' },
  '4': { '2': '4-2', '3': '4-3' },
  '5': { '0': '5-0', '3': '5-3' } }
Test SUCCEEDED.
Shortest path from 3 to 0 =
3 -(2-3)-> 2 -(0-2)-> 0

++++++++++++++++++++++++++++++++++++++

Test graph =
{ '0': { '1': '0-1', '2': '0-2', '5': '0-5' },
  '1': { '0': '1-0', '2': '1-2' },
  '2': { '0': '2-0', '1': '2-1', '3': '2-3', '4': '2-4' },
  '3': { '2': '3-2', '4': '3-4', '5': '3-5' },
  '4': { '2': '4-2', '3': '4-3' },
  '5': { '0': '5-0', '3': '5-3' } }
Test SUCCEEDED.
Shortest path from 4 to 0 =
4 -(2-4)-> 2 -(0-2)-> 0

++++++++++++++++++++++++++++++++++++++

Test graph: actor graph
Test SUCCEEDED.
Kevin Bacon's Bacon number is 0
Shortest path from Kevin Bacon to Kevin Bacon =
Kevin Bacon

++++++++++++++++++++++++++++++++++++++

Collecting Bacon numbers frequencies ...
Frequencies of Bacon numbers:
{ '0': 1, '1': 453, '2': 12225, '3': 12318, '4': 1030 }

++++++++++++++++++++++++++++++++++++++

Random actor with a Bacon number of 0:
Kevin Bacon
Shortest path to Kevin Bacon:
Kevin Bacon

++++++++++++++++++++++++++++++++++++++

Random actor with a Bacon number of 1:
James Remar
Shortest path to Kevin Bacon:
James Remar -(X-Men: First Class)-> Kevin Bacon

++++++++++++++++++++++++++++++++++++++

Random actor with a Bacon number of 2:
Isaac C. Singleton Jr.
Shortest path to Kevin Bacon:
Isaac C. Singleton Jr. -(Breaking Dawn)-> Kathryn Joosten -(Rails & Ties)-> Kevin Bacon

++++++++++++++++++++++++++++++++++++++

Random actor with a Bacon number of 3:
Tom Fleming
Shortest path to Kevin Bacon:
Tom Fleming -(Mary, Queen of Scots)-> Jeremy Bulloch -(Star Wars: Episode III - Revenge of the Sith)-> Natalie Portman -(New York, I Love You)-> Kevin Bacon

++++++++++++++++++++++++++++++++++++++

Random actor with a Bacon number of 4:
Corinne Marchand
Shortest path to Kevin Bacon:
Corinne Marchand -(Attention Bandits!)-> Olivier Cruveiller -(La Vie en Rose)-> Nathalie Cox -(Kingdom of Heaven)-> Michael Sheen -(Frost/Nixon)-> Kevin Bacon

++++++++++++++++++++++++++++++++++++++
```
