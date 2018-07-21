function obstacles() {
  drawObstacles();
  moveObstacles();
  createObstacles();
  checkCollision();
  deleteObstacles();
}

function createObstacles() {
  for (var i = 0; i < obstaclesToSpawn; i++) {
    obstaclesToSpawn--;
    obstaclesArray.push(createVector(screenSize.width - 32 + (Math.floor(Math.random() * 1000) + 200) +  lastObstaclesX / 2, screenSize.height/1.5 - 30));
    lastObstaclesX = obstaclesArray[i].x;
    obstaclesSpeed += 0.1;
    console.log('obs spawned at ', obstaclesArray[i].x);
  }
}

function drawObstacles() {
  for (var i = 0; i < obstaclesArray.length; i++) {
    rect(obstaclesArray[i].x, obstaclesArray[i].y, 30, 30);
  }
}

function deleteObstacles() {
  for (var i = 0; i < obstaclesArray.length; i++) {
    if (obstaclesArray[i].x < -60) {
      obstaclesToSpawn++;
      obstaclesArray.splice(i, 1);
    }
  }
}

function moveObstacles() {
  for (var i = 0; i < obstaclesArray.length; i++) {
    obstaclesArray[i].sub(obstaclesSpeed, 0);
  }
}

function checkCollision() {
  for (var i = 0; i < obstaclesArray.length; i++) {
    if (obstaclesArray[i].x < player.x + 13 && obstaclesArray[i].x + 30 > player.x) {
      if (player.y <= ground && player.y > ground - 24) {
        dead = true;
      }
    }
  }
}
