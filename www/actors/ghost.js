/**
 * @fileoverview  Provide the Ghost class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Ghost class, aka Ghini.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Ghost = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Ghost';
  this.facing = ace.randomFacing();
  this.walkSpeed = 1;
  this.rotX = -.4;
  this.hitPoints = 9;
};
ace.inherits(ace.Ghost, ace.Enemy);


/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.Ghost.prototype.onTick = function(game) {
  if (this.standardCloudSpawnCheck()) return;
  if (this.standardDeathCheck(game)) return;

	// We're walking. There's a small chance we'll change directions.
	if (ace.randomInt(100) < 5) {
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
	
	// Though we keep track of facing for purposes of movement,
  // these ghosts only are rendered facing up or down.
  if (this.facing == 'left' || this.facing == 'down') {
    this.rotZ = ace.getRotZByFacing('down');
  } else if (this.facing == 'right' || this.facing == 'up') {
    this.rotZ = ace.getRotZByFacing('up');
  }


  //this.rotZ = this.angleTo(game.avatar.x, game.avatar.y);
  //this.zOffset = 1 + Math.floor(this.rotZ * 30) % 2;
  this.draw('ghost');
  
  if (this.carrying) {
    this.draw(this.carrying.toLowerCase());
  }
  game.engine.drawLight($('shadow-obstacle'), this.x, this.y+8,21,.5);  
};


/**
 * What happens when the avatar touches us.
 * @param {ace.Runner} The game Runner.
 */
ace.Ghost.prototype.onTouchAvatar = function(runner) {
  // Do the "usual" thing, in case we're a coin or something.
  if (this.standardOnTouchAvatar(runner)) return;

  // Otherwise, dose out some damage...
  runner.avatar.takeDamage(1);
};

