## How many costar connections to Kevin Bacon?

This node.js app generates an actor costar graph from
a movie database, and computes the shortest path from
any actor to Kevin Bacon using a breadth-first graph search.

### Usage

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

More examples of shortest paths to Bacon:

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


### The issue of multi-edges

Note that you may get different movie names on the connections than those I've
shown here. In general actors can and do co-star in multiple movies together,
so any given edge in the costar graph can be a multi-edge. Which edge label gets
chosen depends on the order in which the movie files are loaded (see Data below).
The Bacon number depends only on the fact that _there exists_ an edge between two
actors.

Get a list of all actors who have costarred with Kevin Bacon in a movie:

```bash
[rule146@rule146: nth-bacon]$ ack -l "Kevin Bacon" films/*.json | \
xargs -n 1 -I {} tail +6 {} | grep name | awk 'BEGIN {FS=":"} {print $2}' | \
sort | uniq | perl -pe 's|.*"(.*)".*|\1|' > kb-costars.txt
```

Run a search for actors who have been in _more than one_ movie with him (this takes a
few min):

```bash
[rule146@rule146: nth-bacon]$ while read actor; do echo "$actor: `ack -l \"Kevin Bacon\" films/*.json | xargs ack -l \"$actor\" | wc -l`"; done < kb-costars.txt | awk 'BEGIN {FS=":"} {if ($2 >= 2) print $1" "$2}'
Bill Paxton         2
Brian Grazer         2
Demi Moore         2
Ed Harris         2
Edi Gathegi         2
Eugene Byrd         2
Gary Oldman         2
Gary Sinise         2
John Candy         2
Kathleen Quinlan         2
Kevin Bacon        35
Kevin Costner         2
Kiefer Sutherland         2
Kyra Sedgwick         2
Marcia Gay Harden         3
Matt Craven         2
Oliver Platt         3
Pruitt Taylor Vince         2
Steve Martin         2
Tim Robbins         2
Tom Hanks         2
Tommy Lee Jones         2
Xander Berkeley         2
```

Each of these actors have a Bacon number of 1, since they costar with Bacon in a movie,
and each represents a node in the costar graph with a _multi-edge_ to
Kevin Bacon (with multiplicities of 2 and 3), because they costar with Bacon in
multiple movies. So the edge chosen to connect these actor nodes to the Bacon node
in the costar graph is a choice of 2 or 3 movies, and the choice is arbitrary. So
for example, Oliver Platt is shown connecting to Bacon via "X-Men: First Class":

```bash
Actor name (or hit enter for Gary Littlejohn): Oliver Platt
Oliver Platt has a Bacon number of 1:
Oliver Platt -(X-Men: First Class)-> Kevin Bacon
```

... but we could have choose to use "Frost/Nixon" or "Flatliners" on that
edge as well, since Bacon and Platt costarred in those movies too:

```bash
[rule146@rule146: nth-bacon]$ ack -l "Kevin Bacon" films/*.json | xargs ack -l "Oliver Platt" | xargs head -6 | ack name
    "name": "Frost/Nixon"
    "name": "Flatliners"
    "name": "X-Men: First Class"
```

But the choice of edge label doesn't effect Oliver Platt's Bacon number. His Bacon
number is 1 since there exists at least one movie he costarred in with Bacon.


### How it works

The app uses breadth-first search (BFS) in the costar graph to build up
a data structure representing the shortest path from the given actor to Kevin Bacon.

### Data

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

We can use the files directly to confirm the shortest path from Johnny Depp
to Kevin Bacon:

```bash
Actor name (or hit enter for Michael Maloney): Johnny Depp
Johnny Depp has a Bacon number of 2:
Johnny Depp -(Alice in Wonderland)-> Michael Sheen -(Frost/Nixon)-> Kevin Bacon
```

First, confirm that Johnny Depp was in "Alice in Wonderland" with Michael Sheen:

```bash
[rule146@rule146: nth-bacon]$ cd films/
[rule146@rule146: films]$ ack "Alice in Wonderland"
12155.json
4:    "name": "Alice in Wonderland"
[rule146@rule146: films]$ ack "Johnny Depp" 12155.json
      "name": "Johnny Depp",
[rule146@rule146: films]$ ack "Michael Sheen" 12155.json
      "name": "Michael Sheen",
```

Yep. Next, confirm Michael Sheen was in "Frost/Nixon" with Kevin Bacon:

```bash
[rule146@rule146: films]$ ack "Frost/Nixon"
11499.json
4:    "name": "Frost/Nixon"
[rule146@rule146: films]$ ack "Michael Sheen" 11499.json
      "name": "Michael Sheen",
[rule146@rule146: films]$ ack "Kevin Bacon" 11499.json
      "name": "Kevin Bacon",
```

Yes. So this is a valid path through the costar graph. (It's harder to confirm that
this is the _shortest_ such path by grepping through the files in this way.)

### Test suite

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
