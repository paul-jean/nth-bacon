## How many costar connections to Kevin Bacon?

This node.js app generates an actor costar graph from
a movie database, and computes the shortest path from
any actor to Kevin Bacon, via nth degree costars.

## Usage

Run `node nthbacon.js` to initialize the costar graph:

```bash
[rule146@rule146: nth-bacon]$ node nthbacon.js
Building costar graph ...
Constructing shortest paths to Kevin Bacon ...

1000 keys marked
queue length = 995
2000 keys marked
queue length = 1972
3000 keys marked
queue length = 2956
4000 keys marked
queue length = 3944
5000 keys marked
queue length = 4883
6000 keys marked
queue length = 5848
7000 keys marked
queue length = 6823
8000 keys marked
queue length = 7775
9000 keys marked
queue length = 8730
10000 keys marked
queue length = 9691
11000 keys marked
queue length = 10636
12000 keys marked
queue length = 11599
13000 keys marked
queue length = 12527
14000 keys marked
queue length = 13472
15000 keys marked
queue length = 14412
16000 keys marked
queue length = 15273
17000 keys marked
queue length = 16054
18000 keys marked
queue length = 16851
19000 keys marked
queue length = 17549
20000 keys marked
queue length = 18153
21000 keys marked
queue length = 18654
22000 keys marked
queue length = 19190
23000 keys marked
queue length = 19689
24000 keys marked
queue length = 18617
25000 keys marked
queue length = 12238
26000 keys marked
queue length = 2114
```

You will be prompted to enter an actor name, or you can simply hit enter to choose a randomly chosen actor
from the costar graph:

```bash
Actor name (or hit enter for Carlos Kaspar):
Shortest path to Carlos Kaspar:
Carlos Kaspar -(Cheese Head)-> Federico Luppi -(Pan's Labyrinth)-> Doug Jones -(Quantum Quest: A Cassini Space Odyssey)-> Hayden Christensen -(New York, I Love You)-> Kevin Bacon
```

The costar connections leading from the chosen actor to Kevin Bacon are shown.
The connections (graph edges) are labeled with the movie the costars were in together.

More examples:

```bash
Actor name (or hit enter for Hiroko Seki):
Shortest path to Hiroko Seki:
Hiroko Seki -(Kiki's Delivery Service)-> Kirsten Dunst -(Heroes and Demons)-> Michael Sheen -(Frost/Nixon)-> Kevin Bacon

Actor name (or hit enter for Madeline Carroll):
Shortest path to Madeline Carroll:
Madeline Carroll -(When a Stranger Calls)-> Kate Jennings Grant -(Frost/Nixon)-> Kevin Bacon

Actor name (or hit enter for John Ladalski):
Shortest path to John Ladalski:
John Ladalski -(The Cyprus Tigers)-> Simon Yam -(Dragon Squad)-> Maggie Q -(New York, I Love You)-> Kevin Bacon

Actor name (or hit enter for Stella Schnabel):
Shortest path to Stella Schnabel:
Stella Schnabel -(Rampart)-> Robin Wright -(New York, I Love You)-> Kevin Bacon

Actor name (or hit enter for Eugenio Caballero): Johnny Depp
Shortest path to Johnny Depp:
Johnny Depp -(Alice in Wonderland)-> Michael Sheen -(Frost/Nixon)-> Kevin Bacon
```

## How it works

The app uses breadth-first search (BFS) in the costar graph to build up
a data structure representing the shortest path from any actor A to actor B
(here assumed to be Kevin Bacon).
