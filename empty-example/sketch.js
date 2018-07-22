let screenSize;
let ground;
let jumping;
// let jumpHeight = 90;
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
let generation = 1;
let population;
let mutationRate = 0.01;
let playersAlive;
let realPlayers = true;

let pass = []; // [DEBUG] for debugging purposes in DNA.js mates()

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
  if (!population || players.length <= 1) { // if we the game didn't start yet or we have 1 realPlayers
    if (realPlayers) { // if player is real person
      population = new Population(1, mutationRate);
    } else { // else load our AI
      population = new Population(100, mutationRate);
    }
    console.log('Initialized population');
  }
  playersAlive = 100;
}

function draw() {
  // console.log('player X:Y ', player.x, ' : ', player.y);
  // if (!dead) {
    background(100);
    drawGround();
    population.run();
    obsClass.showObstacles();
    info();
  // } else {
  //   showDead();
  // }
}

function keyTyped() {
  if (key === 'w') {
    players[0].bigJump();
  } else if (key === 'r') {
    players = [];
    highScore = 0;
    setup();
  } else if (key === 'x') {
    killAll();
  } else if (key === 't') {
    highScore = 0;
    realPlayers = !realPlayers;
    players = [];
    setup();
  }
}

function keyPressed() {
    if (keyCode === 32) {
      players[0].jump();
    }
}

function drawGround() {
  fill(255);
  line(0, screenSize.height/1.5, screenSize.width, screenSize.height/1.5);
}

// what do you think this do?
function showDead() {
  textSize(20);
  text('You are dead, press R to restart', screenSize.width / 6, screenSize.height / 4);
}

// Death comes!
function killAll() {
  players.filter((player) => {
    player.dead = true;
    player.score = int(random(500)); // give them score to prevent error in fitness score
  });
}
