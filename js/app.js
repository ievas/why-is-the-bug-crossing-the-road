
let Enemy = function(x, row, speed, person) {

  this.x = x;
  this.row = row;

  this.y = row * 83 - 25;

  this.horizontalMove = 101;
  this.speed = speed;

  this.sprite = `images/char-${person}.png`;
};
//*****

//****
//methods
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if(this.x < this.horizontalMove * 5){
      //move forward
      this.x += this.speed * dt;//increment x by speed and multiply by dt
      //reset the enemies position if it crossed the game board
    } // by MC
    else{
      this.x = -this.horizontalMove;//reset enemy position
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctxOne.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//****
let Level = function(){
  this.title = 'Level'
  this.level = 1;
  this.x = 50;
  this.y = 50;
}
Level.prototype.render = function() {
  ctxTwo.font = 'bolder 30px Verdana';
  ctxTwo.textAlign = 'left';
  ctxTwo.fillStyle = 'gold';
  ctxTwo.fillText(`${this.title}: ${this.level}`, this.x, this.y);
}
let levelTitle = new Level();
//*****

//*****
let Player = function(){//KONSTRUKTORS
  //Variables go here
  this.sprite = 'images/player-bug.png';
  this.horizontalMove = 101;
  this.verticalMove = 83;
  this.startX = this.horizontalMove * 2.05;
  this.startY = (this.verticalMove * 5) + 50;
  this.x = this.startX;
  this.y = this.startY;
  this.row = 5;
  this.win = false;
};
//player.render(){
//  ctx.drawImage(Rescources.get(this.sprite), this.x, this.y);
//}
//methods
Player.prototype.update = function(dt){
  //Here goes everything we want to update about players position as each game loop starts
  //update position/multiply coordinates by dt?
  //check checkCollisions//
  //did players x and y coordinates collide with enemy sprite (or its coordinates?)
  //a win or level up: did players x and y coordinates reached river tiles sprite (or its coordinates?)
  for (let i = 0; i < allEnemies.length; i++) {
    //Collision detection
    let enemy = allEnemies[i];
    if (this.row === enemy.row && enemy.x + enemy.horizontalMove/1.5 > this.x && enemy.x < this.x + this.horizontalMove/1.5){
      this.resetPosition();
    };
  }

  if (this.row === 0) {
    console.log('win!');
    this.win = true;
    this.resetPosition();
    levelTitle.level++;
    allEnemies.push(randomEnemy());
  }
};
Player.prototype.render = function(){//draws on screen
  ctxOne.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(input){
//this method is handling input from the keyboard event listener -> updating x and y coordinates
//if (this.win){
  //return;
//}//===true

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
}
}
Player.prototype.resetPosition = function(){
  this.x = this.startX;
  this.y = this.startY;
  this.row = 5;
}
// instantiate your objects.
//if(levelTitle.level === 1){}
let pinkGirl = new Enemy(-101, 1, 150, 'pink-girl-copy');
let hornGirl = new Enemy(-101, 2, 200, 'horn-girl');
let bugBoy = new Enemy((-101*2), 2, 70, 'boy');
let catGirl = new Enemy(-101, 3, 80, 'cat-girl');
let bugBoy2 = new Enemy(-101, 3, 300, 'boy');
let hornGirl2 = new Enemy(-101, 1, 90, 'horn-girl');
let princess = new Enemy(-101, 1, 80, 'princess-girl')

//if(levelTitle.level === 2){}
//if(levelTitle.level === 3){}
//if(player.win){
//allEnemies.push(princess);
//let randomEnemy;
//enemy.speed + 10;
//}


function randomEnemy() {
  let randomSpeed = 50 + Math.floor(Math.random() * 251);
  let randomRow = 1 + Math.floor(Math.random() * 3);
  let persons = ['pink-girl-copy', 'horn-girl', 'cat-girl', 'boy', 'princess-girl'];
  let randomPerson = persons[Math.floor(Math.random() * persons.length)];
  return new Enemy(-101, randomRow, randomSpeed, randomPerson);
}

let player = new Player();
let allEnemies = [];

allEnemies.push(bugBoy, pinkGirl, catGirl);
//****
let Star = function(x, row) {//KONSTRUKTORS
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
    }, 1000);
  };
};
let allStars = [];
let firstStar = new Star(0, 0);
let secondStar = new Star(101, 0);
let thirdStar = new Star(202,0);
let fourthStar = new Star(303,0);
let fifthStar = new Star(404,0);

allStars.push(firstStar, secondStar, thirdStar, fourthStar, fifthStar);
//****
let Text = function() {
    //this.x = x;
    this.y = 200;
    this.x = 40;
    this.levelUpText = 'WhY DiD ThE BuG CrOsS ThE RoAd?'
    this.sprite = 'images/question.png'
}
Text.prototype.render = function() {
  if(player.win){
    ctxTwo.fillStyle = 'gold';
    ctxTwo.fillText(this.levelUpText, this.x, this.y);
    //ctxTwo.font = 'bolder 30px Verdana';
    //ctxTwo.shadowColor = 'black';
    //ctxTwo.shadowBlur = 10;
  }

};
let title = new Text();
//***


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
