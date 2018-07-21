var screenSize;
var ground;
var jumping;
var jumpHeight = 90;
var player;
var obstaclesToSpawn;
var obstaclesArray;
var lastObstaclesX;
var obstaclesSpeed;
var gravity = 1;
var jumpSpeed;
var dead;
var score;

function setup() {
  screenSize = createCanvas(windowWidth / 2, windowHeight / 2);
  ground = screenSize.height/1.5 - 30;
  player = createVector(30, ground);
  lastObstaclesX = screenSize.width;
  obstaclesArray = [];
  jumping = false;
  jumpSpeed = 10;
  score = 0;
  dead = false;
  obstaclesSpeed = 4;
  obstaclesToSpawn = 2;
}

function draw() {
  // console.log('player X:Y ', player.x, ' : ', player.y);
  if (!dead) {
    background(100);
    drawGround();
    drawPlayer();
    gravityPull();
    obstacles();
    info();
  } else {
    showDead();
  }
}

function keyTyped() {
  if (key === 'w') {
    jumpHeight = 150;
    jump();
  } else if (key === 'r') {
    setup();
  }
}

function keyPressed() {
    if (keyCode === 32) {
      jumpHeight = 90;
        jump();
    }
}

function drawGround() {
  fill(255);
  line(0, screenSize.height/1.5, screenSize.width, screenSize.height/1.5);
}

function drawPlayer() {
  rect(30, player.y, 20, 30);

  // jump if jumping is true
  if (jumping) {
    player.sub(0, jumpSpeed + (obstaclesSpeed * 0.1));
  }
}

// set jump to true
function jump() {
  if (grounded()) {
    jumping = true;
  }
}

// check if player is in the ground
function grounded() {
  if (player.y < ground) {
    return false;
  } else {
    return true;
  }
}

function gravityPull() {
  // stop the jumping
  if (player.y < ground - jumpHeight) {
    jumping = false;
  }

  // pull player to ground
  if (player.y < ground) {
    gravity += 0.01 + (obstaclesSpeed * 0.02); // make gravity higher as time pass by
    if (!jumping) {
      player.y += gravity;
    }
  } else {
    gravity = 1;
    player.y = ground;
  }
}

// what do you think this do?
function showDead() {
  textSize(20);
  text('You are dead, press R to restart', screenSize.width / 6, screenSize.height / 4);
}
