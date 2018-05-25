// @description Enemies our player must avoid
// @param x & y the x and y coordinates of enemy
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};


// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

    // @description to make the bugs reappear and to randomize the speed of speed
    if (this.x > 509) {
        this.x = -50;
        this.speed = 150 + Math.floor(Math.random() * 225);
    }

    // @description to handle collision of bugs and the player
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
        player.x = 201;
        player.y = 406;
    }
};


// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// @description Player object
// @param x & y the x and y coordinates of the player
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.player = 'images/char-horn-girl.png';
}


// @description Updates the player's position
Player.prototype.update = function(dt) {

}


// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
}


let allEnemies = [];
let enemyLocations = [64, 148, 229];


// @description Inastantiates Enemy object
enemyLocations.forEach(function(locY) {
    enemy = new Enemy(0, locY, 200);
    allEnemies.push(enemy);
});


// @description Inastantiates Player object
var player = new Player(202, 405);


// @Deacription Handles the movement of the player
Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left' && this.x >= 0) {
        this.x -= 102;
    }
    if (keyPress == 'right' && this.x < 404) {
        this.x += 102;
    }
    if (keyPress == 'up' && this.y >= 0) {
        this.y -= 83;
    }
    if (keyPress == 'down' && this.y < 404) {
        this.y += 83;
    }
}


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