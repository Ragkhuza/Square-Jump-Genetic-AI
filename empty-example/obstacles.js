class Obstacles {
  showObstacles() {
    this.drawObstacles();
    this.moveObstacles();
    this.createObstacles();
    this.deleteObstacles();
  }

  createObstacles() {
    for (let i = 0; i < obstaclesToSpawn; i++) {
      obstaclesToSpawn--;
      obstaclesArray.push(createVector(screenSize.width - 32 + (Math.floor(Math.random() * 1000) + 200) +  lastObstaclesX / 2, screenSize.height/1.5 - 30));
      lastObstaclesX = obstaclesArray[i].x;
      obstaclesSpeed += 0.1;
      console.log('obs spawned at ', obstaclesArray[i].x);
    }
  }

  drawObstacles() {
    for (let i = 0; i < obstaclesArray.length; i++) {
      rect(obstaclesArray[i].x, obstaclesArray[i].y, 30, 30);
    }
  }

  deleteObstacles() {
    for (let i = 0; i < obstaclesArray.length; i++) {
      if (obstaclesArray[i].x < -60) {
        obstaclesToSpawn++;
        obstaclesArray.splice(i, 1);
      }
    }
  }

  moveObstacles() {
    for (let i = 0; i < obstaclesArray.length; i++) {
      obstaclesArray[i].sub(obstaclesSpeed, 0);
    }
  }

  checkCollision(player) {
    for (let i = 0; i < obstaclesArray.length; i++) {
      if (obstaclesArray[i].x < player.pos.x + 13 && obstaclesArray[i].x + 30 > player.pos.x) {
        if (player.pos.y <= ground && player.pos.y > ground - 24) {
          player.dead = true;
          player.score = score;
          player.pos.y = 0;
          player.pos.x = 0;
          console.log('player', i, ': got a score of ', score);
        }
      }
    }
  }
}
