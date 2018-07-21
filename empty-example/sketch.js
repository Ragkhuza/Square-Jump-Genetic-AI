let screenSize;
let ground;
let jumping;
let jumpHeight = 90;
let player;
let players = [];
let obstaclesToSpawn;
let obstaclesArray;
let lastObstaclesX;
let obstaclesSpeed;
let initialGravity = 3;
let gravity;
let jumpSpeed;
let dead;
let score;
let highScore = 0;
let obsClass;
let generation = 0;

function setup() {
  screenSize = createCanvas(windowWidth / 2, windowHeight / 2);
  ground = screenSize.height/1.5 - 30;
  // player = createVector(30, ground);
  lastObstaclesX = screenSize.width;
  obstaclesArray = [];
  gravity = initialGravity;
  jumping = false;
  jumpSpeed = 10;
  score = 0;
  dead = false;
  obstaclesSpeed = 4;
  obstaclesToSpawn = 2;
  obsClass = new Obstacles();
  for (var i = 0; i < 100; i++) {
    players[i] = new Player();
  }
  generation++;
}

function draw() {
  // console.log('player X:Y ', player.x, ' : ', player.y);
  // if (!dead) {
    background(100);
    drawGround();
    if(checkEachPlayer()) { // updates each player and check if all players is dead
      console.log('all players is dead');
      setup();
    } else if(score > highScore) { // else if all players is dead check if score is higher the highscore
      highScore = Math.round(score); // if so set a new highscore
    }
    obsClass.showObstacles();
    info();
  // } else {
  //   showDead();
  // }
}

function keyTyped() {
  if (key === 'w') {
    jumpHeight = 150;
    players[0].jump();
  } else if (key === 'r') {
    setup();
  }
}

function keyPressed() {
    if (keyCode === 32) {
      jumpHeight = 90;
        players[0].jump();
    }
}

function drawGround() {
  fill(255);
  line(0, screenSize.height/1.5, screenSize.width, screenSize.height/1.5);
}

function drawPlayer(player) {
    rect(30, player.pos.y, 20, 30);
    // jump if jumping is true
    if (player.jumping) {
      player.pos.sub(0, jumpSpeed + (obstaclesSpeed * 0.1));
    }
}

function gravityPull(player) {
  // stop the jumping
  if (player.pos.y < ground - jumpHeight) {
    player.jumping = false;
  }

  // pull player to ground
  if (player.pos.y < ground) {
    // gravity += 0.05 + (obstaclesSpeed * 0.02); // make gravity higher as time pass by
    if (!player.jumping) {
      player.pos.y += gravity;
    }
  } else {
    gravity = initialGravity;
    player.pos.y = ground;
  }
}

// what do you think this do?
function showDead() {
  textSize(20);
  text('You are dead, press R to restart', screenSize.width / 6, screenSize.height / 4);
}

function checkEachPlayer() {
  let allDead = true;
  for (var i = 0; i < players.length; i++) {
    if (!players[i].dead) {
      drawPlayer(players[i]);
      gravityPull(players[i]);
      obsClass.checkCollision(players[i]);
      allDead = false;
      players[i].run(obstaclesArray);
    }
  }
  return allDead;
}
