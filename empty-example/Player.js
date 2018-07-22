class Player {
  constructor(dna) {
    this.pos = createVector(30, ground);
    this.jumping = false;
    this.dead = false;
    this.score = 0;
    this.initialJumpHeight = 90;
    this.jumpHeight = this.initialJumpHeight;
    this.gravity = initialGravity;
    if (dna) {
      this.dna = dna;
    } else {
      this.dna = new DNA();
    }
    this.fitness = 0;
  }

  run(obs) { // brain
    for (let i = 0; i < obs.length; i++) {
      let njd = this.dna.genes[0] + (obstaclesSpeed * 2); // normalJumpDistance
      if (obs[i].x - this.pos.x < njd) { // if we are about to hit obstacle

        let obs1 = obs[0].x || 0;
        let obs2 = 0;
        if (obs[1]) obs2 = obs[1].x;
        let d = Math.abs(obs1 - obs2);

        let bjd = njd * 2 - (obstaclesSpeed * 2); // when to do a big Jump?
        if (d < bjd) { // if two obstacles are close together
          this.bigJump(); // do a bigjump
          // console.log('A player did a big jump');
        } else {
          this.jump(); // then jump
        }

      }
    }

  }

  bigJump() {
    this.jumpHeight = this.initialJumpHeight * 1.5;
    if (this.grounded()) {
      this.jumping = true;
    }
  }
  // set jump to true
  jump() {
    this.jumpHeight = this.initialJumpHeight;
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
    this.fitness = this.score;
  }

  getDNA() {
    return this.dna;
  }

  getFitness() {
    return this.fitness;
  }
}
