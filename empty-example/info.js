function info() {
  calcScore();
  showScore();
  showSpeed();
  if (!realPlayers) {
    showAlive();
    showGen();
  }

}

function  showGen() {
  text('Gen#: ' + generation, screenSize.width - 120, 30);
}

function showScore() {
  textSize(15);
  text('Score: ' + int(score), 30, 30);
  text('Best Score: ' + highScore, screenSize.width / 3, 30);
}

function calcScore() {
  score += 1 / 10; // increment score as per frame and slow it down by 10
  score += + obstaclesSpeed * 0.01; // add obstaclesSpeed as score
}

function showSpeed() {
  // toPrecision rounds the number to nearest hundred
  text('Obstacle Speed: ' + obstaclesSpeed.toPrecision(3), 30, screenSize.height - 30);
}

function showAlive() {
  text('Alive: ' + playersAlive, screenSize.width - 120, screenSize.height - 30);
}
