class Player {
  constructor() {
    this.pos = createVector(30, ground);
    this.jumping = false;
    this.dead = false;
    this.score = 0;
    this.dna = new DNA();
    this.fitness = 0;
  }

  run(obs) {
    // for (var i = obs.length; i > 0; i--) {
    for (let i = 0; i < obs.length; i++) {
      let dnaX = this.dna.genes[0];
      if (obs[i].x - this.pos.x < dnaX) {
        this.jump();
      }
    }

  }

  // set jump to true
  jump() {
    if (this.grounded()) {
      this.jumping = true;
    }
  }

  // check if player is in the ground
  grounded() {
    if (this.pos.y < ground) {
      return false;
    } else {
      return true;
    }
  }

  calcFitness() {
    return this.fitness;
  }

  getDNA() {
    return this.dna;
  }

  getFitness() {
    return this.fitness;
  }
}
