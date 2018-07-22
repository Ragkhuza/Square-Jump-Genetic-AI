class Population {
  constructor(num, mutateRate) {
    this.matingPool = [];
    this.mutationRate = mutateRate;

    for (var i = 0; i < num; i++) {
      players[i] = new Player();
    }
  }

  run() { // entry point
    if(this.checkEachPlayer()) { // updates each player and check if all players is dead
      console.log('all players is dead');
      // if all players is dead then...
      this.selection(); // evaluate fitness of each player, build the matingPool and fill the matingPool
      this.reproduction(); // refill the population with children from the mating pool
      setup(); // restart
    } else {

      if(score > highScore) { // else if all players is dead check if score is higher the highscore
        highScore = Math.round(score); // if so set a new highscore
      }
    }
  }

  drawPlayer(player) {
    let fittestPlayer = this.getFitestPlayer();
    let pc = map(player.score, 0, this.calcFitness, 0, 100); // player color
    if (player === fittestPlayer) {
      fill('red'); // make the most fittest player color different
      rect(30, player.pos.y, 22, 32); // make the most fittest a little bigger
    } else if (player.getDNA().mutated) {
      fill('green');
      rect(30, player.pos.y, 20, 30);
    } else {
      rect(30, player.pos.y, 20, 30);
    }
    fill('white');
    // jump if jumping is true
    if (player.jumping) {
      player.pos.sub(0, jumpSpeed + (obstaclesSpeed * 0.1));
    }
  }

  gravityPull(player) {
    // stop the jumping
    if (player.pos.y < ground - player.jumpHeight) {
      player.jumping = false;
    }

    // pull player to ground
    if (player.pos.y < ground) {
      player.gravity += 0.005 + (int(obstaclesSpeed * 0.01)); // make gravity higher as time pass by
      if (!player.jumping) {
        player.pos.y += player.gravity;
      }
    } else {
      player.gravity = initialGravity;
      player.pos.y = ground;
    }
  }

  checkEachPlayer() {
    let allDead = true;
    for (var i = 0; i < players.length; i++) {
      if (!players[i].dead) {
        this.drawPlayer(players[i]);
        this.gravityPull(players[i]);
        obsClass.checkCollision(players[i]);
        allDead = false;
        players[i].run(obstaclesArray);
      }
    }
    return allDead;
  }

  calcFitness() {
    for (var i = 0; i < players.length; i++) {
      players[i].calcFitness();
    }
  }

  getFitestPlayer() { // returns player class
    let fittestPlayer = players[0];
    players.filter((player) => {
      if (player.getFitness() > fittestPlayer.getFitness()) {
        fittestPlayer = player;
      }
    });
    return fittestPlayer;

  }

  getMaxFitness() { // returns fittest value of player
    let maxFitness = 0;
    players.filter((player) => {
      if (player.getFitness() > maxFitness) {
        maxFitness = player.getFitness();
      }
    });
    return maxFitness;
  }

  selection() { // filling the matingPool
    this.matingPool = [];
    this.calcFitness();

    let maxFitness = this.getMaxFitness();
    console.log('maxFitness: ', maxFitness);

    for (let i = 0; i < players.length; i++) {
      let normalizedFitness = map(players[i].getFitness(), 0, maxFitness, 0, 1); // map players fitness between 0 and 1
      let clone = int(normalizedFitness * 100); // number of times this player will be put into matingPool

      for (var j = 0; j < clone; j++) {
        this.matingPool.push(players[j]);
      }
    }
    // console.log(this.matingPool);
  }

  reproduction() { // Making the next generation
    pass[0] = pass[1] = pass[2] = pass[4] = pass[5] = false; // [DEBUG] for debugging purposes only
    for (var i = 0; i < players.length; i++) {
      // pick two random parents
      // let m = int(random(this.matingPool.length));
      let d = int(random(this.matingPool.length));

      // let mom = this.matingPool[m];
      let dad = this.matingPool[d];

      // get their genes
      // let momGenes = mom.getDNA();
      let dadGenes = dad.getDNA();

      // mate their genes
      // let childDNA = dadGenes.mates(momGenes);
      let childDNA = dadGenes.mates(dadGenes);

      // mutate their genes
      childDNA.mutate(this.mutationRate);

      players[i] = new Player(childDNA);
    }

    console.log('Moving to next generation');
    generation++;
  }

}

// Step 1: Initialize. Create a population of N elements, each with randomly generated DNA.
//
// LOOP:
//
// Step 2: Selection. Evaluate the fitness of each element of the population and build a mating pool.
//
// Step 3: Reproduction. Repeat N times:
//
//  a) Pick two parents with probability according to relative fitness.
//  b) Crossover—create a “child” by combining the DNA of these two parents.
//  c) Mutation—mutate the child’s DNA based on a given probability.
//  d) Add the new child to a new population.
//
// Step 4. Replace the old population with the new population and return to Step 2.
