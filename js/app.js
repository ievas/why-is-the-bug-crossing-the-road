
let Enemy = function() {//KONSTRUKTORS
    // Variables go here
    this.x = 0;
    this.y = 0;
    //speeds (?)

    this.sprite = 'images/char-boy.png';
};
//methods
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //if suggested by MC
    //move forward
    //increment x by speed and multiply by dt
    //reset the enemies position if it crossed the game board
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let Player = function(){//KONSTRUKTORS
  //Variables go here
  this.sprite = 'images/player-bug.png';
  this.side = 101;
  this.up = 83;
  this.startX = this.side * 2;
  this.startY = this.up * 4.5;
  this.x = this.startX;
  this.y = this.startY;
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
};
Player.prototype.render = function(){//draws on screen
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(input){
//this method is handling input from the keyboard event listener -> updating x and y coordinates
switch(input){
  case 'left':
    if (this.x > 0){
      this.x -= this.side;
  }
    break;
  case 'up':
    if (this.y > (this.up * 1.5)){
      this.y -= this.up;
  }
    break;
  case 'right':
    if (this.x < this.side * 3.9){
      this.x += this.side;
  }
    break;
  case 'down':
  if (this.y < this.up * 5){
      this.y += this.up;
  }
    break;
}
}
Player.prototype.resetPosition = function(){
  //reset to starting point x and y -> where is starting point, how do I find it, where do I set it?
}
// instantiate your objects.

//let pinkGirl = new Enemy();
//let hornGirl = new Enemy();
let bugBoy = new Enemy();
//for loop to create a new enemy object with random speed (?)
let player = new Player();
let allEnemies = [];

allEnemies.push(bugBoy);



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
