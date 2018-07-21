class Player {
  constructor() {
    this.pos = createVector(30, ground);
    this.jumping = false;
    this.dead = false;
    this.score = 0;
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
}
