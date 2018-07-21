function info() {
  calcScore();
  showScore();
}

function showScore() {
  textSize(15);
  text('Score: ' + Math.floor(score), 30, 30);
  text('Gen#: ' + generation, screenSize.width - 120, 30);
}

function calcScore() {
  score += 1 / 10; // increment score as per frame and slow it down by 10
  score += + obstaclesSpeed * 0.01; // add obstaclesSpeed as score
}
