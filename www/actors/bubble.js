/**
 * @fileoverview  Provide the Bubble class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Bubble class, baddie who walks around and hurls rocks.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Bubble = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Bubble';
  this.facing = ace.randomFacing();
  this.walkSpeed = 3;
  this.rotX = -.6;
  this.hitWidth = 8;
  this.hitHeight = 8;
};
ace.inherits(ace.Bubble, ace.Enemy);


/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.Bubble.prototype.onTick = function(game) {
  if (this.standardDeathCheck(game)) return;

	// We're walking. There's a small chance we'll change directions.
	if (ace.randomInt(100) < 6) {
		this.facing = ace.randomFacing();
	}
	
	var dX = this.walkSpeed * ace.xMultByFacing[this.facing];
	var dY = this.walkSpeed * ace.yMultByFacing[this.facing];
	if (this.canWalk(dX, dY)) {
		this.x += dX;
		this.y += dY;
	} else {
		this.facing = ace.randomFacing();
	}

  this.rotZ += .2;
  if (game.isBlinkFrame) {
  	this.draw('bubble-red');
  } else {
    this.draw('bubble-blue');
  }
  game.engine.drawLight($('light-fire'), this.x, this.y,50 + ace.randomInt(60));   
    
};


/**
 * What happens when the avatar touches us.
 * @param {ace.Game} The game.
 */
ace.Bubble.prototype.onTouchAvatar = function(game) {
  // Do the "usual" thing, in case we're a coin or something.
  if (this.standardOnTouchAvatar(game)) return;

  // Otherwise, cause Link to be cursed.
  game.avatar.swordCurseCounter = 60;
  game.avatar.takeDamage(0);
};


/**
 * What happens when we take damage.
 * @param {ace.Game} The game.
 */
ace.Bubble.prototype.takeDamage = function(runner) {
  return false;
};



/**
 * Whether we count as "alive" for purposes of unlocking room secrets.
 * @return {boolean} True if we're not dead.
 */
ace.Bubble.prototype.isAlive = function() {
  return false;
};