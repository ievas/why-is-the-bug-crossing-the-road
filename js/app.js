//Enemy constructor
let Enemy = function(x, row, speed, person) {

  this.x = x;
  this.row = row;

  this.y = row * 83 - 25;

  this.horizontalMove = 101;
  this.speed = speed;

  this.sprite = `images/char-${person}.png`;
};

// Updates the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.x < this.horizontalMove * 5){
      //move forward
      this.x += this.speed * dt;
      //resets the enemies position if it crossed the game board
    }
    else{
      this.x = -this.horizontalMove;
    }
};
// Draws the enemy on the screen
Enemy.prototype.render = function() {
    ctxOne.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//Level count and display
let Level = function(){
  this.title = 'Level'
  this.level = 1;
  this.x = 50;
  this.y = 50;
}
Level.prototype.render = function() {
  ctxTwo.font = 'bolder 30px Kirang Haerang';
  ctxTwo.textAlign = 'left';
  ctxTwo.fillStyle = '#c73400';
  ctxTwo.fillText(`${this.title}: ${this.level}`, this.x, this.y);
}
let levelTitle = new Level();
//Player constructor
let Player = function(){
  this.sprite = 'images/player-bug.png';
  this.horizontalMove = 101;
  this.verticalMove = 83;
  this.startX = this.horizontalMove * 2.05;
  this.startY = (this.verticalMove * 5) + 50;
  this.x = this.startX;
  this.y = this.startY;
  this.row = 5;
  this.win = false;
  this.collision = false;
};
//Here goes everything we want to update about players position as each game loop starts
Player.prototype.update = function(dt){
  for (let i = 0; i < allEnemies.length; i++) {
    //Collision detection
    let enemy = allEnemies[i];
    if (this.row === enemy.row && enemy.x + enemy.horizontalMove/1.5 > this.x && enemy.x < this.x + this.horizontalMove/1.5){
      this.resetPosition();
      this.collision = true;
      //Counts collisions and reduces lives accordingly
      if (player.collision === true){
        collisionCount++;
        };
        //better: allLives.splice(5-collisionCount);
      if(collisionCount===1){
          allLives.splice(3)
        };
      if(collisionCount===2){
          allLives.splice(2)
        };
      if(collisionCount===3){
          allLives.splice(1)
        };
      if(collisionCount===4){
          allLives.splice(0);
      };
      if (collisionCount>=5){
      player.sprite = "images/player-bug-cry.png"
      console.log('cry')
      popUp();
      };
    };
  };
    //Level upgrade
    if (this.row === 0) {
      this.win = true;
      this.resetPosition();
      levelTitle.level++;
      allEnemies.push(randomEnemy());
    }
};
//Draws player on screen
Player.prototype.render = function(){
  ctxOne.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//This method is handling input from the keyboard event listener
Player.prototype.handleInput = function(input){
  if (collisionCount>=5){
    return;
};
  switch(input){
    case 'left':
      if (this.x >this.horizontalMove){
      this.x -= this.horizontalMove;
    }
    break;
    case 'up':
      this.row--;
      if (this.y > (this.verticalMove * 1.9)){
      this.y -= this.verticalMove;
    }
    break;
    case 'right':
      if (this.x < this.horizontalMove * 3.9){
        this.x += this.horizontalMove;
    }
    break;
    case 'down':
      if (this.y < this.verticalMove * 5){
      this.y += this.verticalMove;
      this.row++;
    }
    break;
  };
};
//Reset player's position
Player.prototype.resetPosition = function(){
  this.x = this.startX;
  this.y = this.startY;
  this.row = 5;
};

let pinkGirl = new Enemy(-101, 1, 150, 'pink-girl-copy');
let hornGirl = new Enemy(-101, 2, 200, 'horn-girl');
let bugBoy = new Enemy((-101*2), 2, 70, 'boy');
let catGirl = new Enemy(-101, 3, 80, 'cat-girl');
let bugBoy2 = new Enemy(-101, 3, 300, 'boy');
let hornGirl2 = new Enemy(-101, 1, 90, 'horn-girl');
let princess = new Enemy(-101, 1, 80, 'princess-girl');

//Shuffles enemy's properties, returns a random enemy
function randomEnemy() {
  let randomSpeed = 50 + Math.floor(Math.random() * 251);
  let randomRow = 1 + Math.floor(Math.random() * 3);
  let persons = ['pink-girl-copy', 'horn-girl', 'cat-girl', 'boy', 'princess-girl'];
  let randomPerson = persons[Math.floor(Math.random() * persons.length)];
  return new Enemy(-101, randomRow, randomSpeed, randomPerson);
};

let player = new Player();
let allEnemies = [];

allEnemies.push(bugBoy, pinkGirl, catGirl);
//Draws stars on the river row in case of win
let Star = function(x, row) {
    this.x = x +10;
     this.y = row + 20;
     this.row = row;
     this.sprite = 'images/red_star.png';
};
Star.prototype.render = function(){
  if(player.win){
    ctxOne.drawImage(Resources.get(this.sprite), this.x, this.y);
    setTimeout(function(){
      player.win = false;
    }, 700);
  };
};
let allStars = [];
let firstStar = new Star(0, 0);
let secondStar = new Star(101, 0);
let thirdStar = new Star(202,0);
let fourthStar = new Star(303,0);
let fifthStar = new Star(404,0);

allStars.push(firstStar, secondStar, thirdStar, fourthStar, fifthStar);
//Draws life symbols on the screen
let Life = function(x, y){
  this.sprite = 'images/player-lives.png';
  this.x = x;
  this.x = y;
}
Life.prototype.render = function(){
  ctxTwo.drawImage(Resources.get(this.sprite), this.x, this.y);
};
let life1 = new Life(555,101);
let life2 = new Life(5,10);
let life3 = new Life(5,20);
let life4 = new Life(5,30);

let allLives = [];
allLives.push(life1, life2, life3, life4);

let collisionCount = 0;
//Game Over modal
function popUp(){
  let tryAgain = document.createElement('div');
  tryAgain.id = 'tryAgain';
  document.body.appendChild(tryAgain);
  document.getElementById('tryAgain').style.display = 'flex';
  tryAgain.innerHTML = `Your game is over at level ${levelTitle.level} <br> Play again?`;
  tryAgain.addEventListener('click', reset);
};

function reset(){
  levelTitle.level = 1;
  allEnemies = [];
  allEnemies.push(bugBoy, pinkGirl, catGirl);
  allLives.push(life1, life2, life3, life4);
  collisionCount = 0;
  let tryAgain = document.getElementById('tryAgain');
  tryAgain.removeEventListener('click', reset);
  document.body.removeChild(tryAgain);
  player.sprite = 'images/player-bug.png'
};
// This listens for key presses and sends the keys to the
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
