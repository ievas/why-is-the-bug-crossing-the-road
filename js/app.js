
let Enemy = function(x, row, speed, person) {

  this.x = x;
  this.row = row;

  this.y = row * 83 - 25;

  this.horizontalMove = 101;
  this.speed = speed;

  this.sprite = `images/char-${person}.png`;
};
//*****
// let Enemy = function(x, y, speed, person) {//KONSTRUKTORS
//     // Variables go here
//     this.x = x;
//     this.y = y + 55;
//     this.horizontalMove = 101;
//     this.speed = speed;
//
//     this.sprite = `images/char-${person}.png`;
//
//     // this.sprite = 'images/char-boy.png';
//     // 'images/char-cat-girl.png',
//     // 'images/char-pink-girl.png',
//     // 'images/char-horn-girl.png',
// };
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
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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

  let enemy = allEnemies[i];
  if (this.row === enemy.row && enemy.x + enemy.horizontalMove/1.5 > this.x && enemy.x < this.x + this.horizontalMove/1.5){
    this.resetPosition();
  };
}
if (this.row === 0){
  console.log('win!');
  this.win = true;
  this.resetPosition();
}
};
Player.prototype.render = function(){//draws on screen
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(input){
//this method is handling input from the keyboard event listener -> updating x and y coordinates
if (this.win){
  return;
}//===true

switch(input){
  case 'left':
    if (this.x > 0){
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

let pinkGirl = new Enemy(-101, 1, 150, 'pink-girl-copy');
let hornGirl = new Enemy(-101, 2, 100, 'horn-girl');
let bugBoy = new Enemy((-101*2), 2, 200, 'boy');
let catGirl = new Enemy(-101, 3, 80, 'cat-girl');

let player = new Player();
let allEnemies = [];

allEnemies.push(bugBoy, hornGirl, pinkGirl, catGirl);



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
