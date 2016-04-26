/**
 * @fileoverview  Provide the Keese class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Keese class, baddie who walks around and hurls rocks.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Keese = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Keese';
  this.direction = ace.randomInt(7);
  this.flySpeed = 0;
  this.targetFlySpeed = 2;
  //this.rotX = - Math.PI/2;
  this.isEvenFrame = true;
  this.maxFlySpeed = 2;
  this.hitWidth = 16;
  this.hitHeight = 16;
};
ace.inherits(ace.Keese, ace.Enemy);


/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.Keese.prototype.onTick = function(game) {
  if (this.standardDeathCheck(game)) return;

	// There's a small chance we'll change directions.
	if (ace.randomInt(100) < 2) {
	  if (ace.randomInt(1)) {
		  this.facing = (this.facing + 8 + 1) % 8;
		} else {
		  this.facing = (this.facing + 8 - 1) % 8;
		}
	}
	if (ace.randomInt(100) < 2) {
	  if (ace.randomInt(2)) {
		  this.targetFlySpeed = this.maxFlySpeed;
		} else {
		  this.targetFlySpeed = 0;
		}
	}
	this.shadowZOffset = (10 * this.flySpeed) - 3;
	this.zOffset = 4;

  if (game.currentRoom_.isSideScroll) {
    this.rotX = -1.6;
    this.yOffset = -16;
    this.z = -984;
    this.zOffset = 0;
    this.targetFlySpeed = this.maxFlySpeed;
  } else {
		var shadowAngle = game.avatar.angleTo(this.x, this.y);
		var shadowDistance = 0; //game.avatar.distance(this) * (this.flySpeed / this.maxFlySpeed);
		var dX = shadowDistance / 4 * Math.sin(shadowAngle);
		var dY = shadowDistance / 4 * - Math.cos(shadowAngle);
		var shadowSize = 10 + 12 * (this.flySpeed / this.maxFlySpeed);
		var shadowAlpha = 1 - (this.flySpeed / this.maxFlySpeed) * .3;
		game.engine.drawLight($('shadow-obstacle'), this.x + dX, this.y + dY - this.shadowZOffset,shadowSize,shadowAlpha);
  }

	this.flySpeed = (this.flySpeed * 10 + this.targetFlySpeed) / 11;

	var directionRadians = ace.radians(45 * this.direction);
	var dX = this.flySpeed * Math.sin(directionRadians);
	var dY = this.flySpeed * Math.cos(directionRadians); 
	if (this.canFly(dX, dY)) {
		this.x += dX;
		this.y += dY;
	} else {
		this.direction = ace.randomInt(7);
	}



  
  var roomMiddleX = Math.floor(this.x / 256) * 256 + 128;
  var roomMiddleY = Math.floor(this.y / 176) * 176 + 88;
  this.isEvenFrame = (Math.floor(this.distance({x:roomMiddleX, y:roomMiddleY})) % 2) == 0;
  if (this.isEvenFrame) {
  	this.draw('keese1');
  } else {
    this.draw('keese2');
  }    
};


/**
 * What happens when the avatar touches us.
 * @param {ace.Runner} The game Runner.
 */
ace.Keese.prototype.onTouchAvatar = function(runner) {
  // Do the "usual" thing, in case we're a coin or something.
  if (this.standardOnTouchAvatar(runner)) return;

  // Otherwise, dose out some damage...
  runner.avatar.takeDamage(.5);
};

