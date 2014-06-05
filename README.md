## Problem spec

I've attached a gzipped tarball with files representing films and their casts.
Using these files as a reference, in any language, presentation, framework or
delivery style, build a program in which you enter the name of an actor or actress
and output the steps to get to Kevin Bacon via Nth degree co-stars.

For example, if I enter Johnny Depp, I might get...

`Johnny Depp -(Once Upon a Time in Mexico)-> Mickey Rourke -(Diner)-> Kevin Bacon`

If I enter Alec Guinness, I might get...

`Alec Guinness -(Kafka)-> Theresa Russell -(Wild Things)-> Kevin Bacon`

Again, feel free to present these chains in any way you see fit. You can either send us
a link to your running program along with the code or just send us the code with a README
of how to run it, as long as we are able to use the program and read the associated code.
One note: please do not use any graph libraries or graph databases.

Here's the `Johnny Depp -> Kevin Bacon` link in the raw data:

```bash
[rule146@rule146: nth-bacon]$ cd films/
[rule146@rule146: films]$ ack "Once Upon a Time in Mexico"
1428.json
4:    "name": "Once Upon a Time in Mexico"
[rule146@rule146: films]$ grep "Mickey Rourke" 1428.json
      "name": "Mickey Rourke",
[rule146@rule146: films]$ ack "Diner"
13776.json
4:    "name": "Diner"
[rule146@rule146: films]$ grep "Mickey Rourke" 13776.json
      "name": "Mickey Rourke",
[rule146@rule146: films]$ grep "Kevin Bacon" 13776.json
      "name": "Kevin Bacon",
```

i.e. `Johnny Depp` was in `"Once Upon a Time in Mexico"` with `Mickey Rourke`,
who was in `"Diner"` with `Kevin Bacon`.

```bash
[rule146@rule146: films]$ ack "Kafka"
12183.json
64:      "name": "Heather Kafka"

124162.json
30:      "name": "Maro Kafkaridou"

2297.json
4:    "name": "Kafka"
[rule146@rule146: films]$ ack "Alec Guinness" 2297.json
      "name": "Alec Guinness",
[rule146@rule146: films]$ ack "Theresa Russell" 2297.json
      "name": "Theresa Russell",
[rule146@rule146: films]$ ack "Wild Things"
16523.json
4:    "name": "Where the Wild Things Are"

617.json
4:    "name": "Wild Things"
[rule146@rule146: films]$ ack "Theresa Russell" 617.json
      "name": "Theresa Russell",
[rule146@rule146: films]$ ack "Kevin Bacon" 617.json
      "name": "Kevin Bacon",
```

The [wikipedia](http://en.wikipedia.org/wiki/Six_Degrees_of_Kevin_Bacon) article says:
"According to the Oracle of Bacon website, approximately 12% of all actors cannot be linked to Bacon"

There are 54K unique actors in the database:

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

[rule146@rule146: films]$ find . -name '*.json' | xargs -n 1 -I {} tail +6 {} | grep name | awk 'BEGIN {FS=":"} {print $2}' | uniq | head
 "Joaquin Phoenix",
 "Rick Moranis",
 "Jeremy Suarez",
 "Joan Copeland",
 "Michael Clarke Duncan",
 "Harold Gould",
 "Jason Raize",
 "Paul Christie",
 "Danny Mastrogiorgio",
 "Dave Thomas",

[rule146@rule146: films]$ find . -name '*.json' | xargs -n 1 -I {} tail +6 {} | grep name | awk 'BEGIN {FS=":"} {print $2}' | uniq | wc -l
   53636
```

Why the critical slowdown? The queue is growing monotonically:

```bash
^C[rule146@rule146: nth-bacon]$ node nthbacon.js
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
...
```

