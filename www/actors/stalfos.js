/**
 * @fileoverview  Provide the Stalfos class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Stalfos class, baddie who walks around and hurls rocks.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Stalfos = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Stalfos';
  this.isEvenFrame = true;
  this.facing = ace.randomFacing();
  this.walkSpeed = 1;
  this.rotX = -.4;
  this.hitPoints = 2;
};
ace.inherits(ace.Stalfos, ace.Enemy);


/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.Stalfos.prototype.onTick = function(game) {
  if (this.standardDeathCheck(game)) return;

	// We're walking. There's a small chance we'll change directions.
	if (ace.randomInt(100) < 2) {
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


  //this.rotZ = this.angleTo(game.avatar.x, game.avatar.y);
  //this.zOffset = 1 + Math.floor(this.rotZ * 30) % 2;

  
  if (game.isBlinkFrame) {
    this.isEvenFrame = !this.isEvenFrame;
  }
  if (this.isEvenFrame) {
  	this.draw('stalfos');
  } else {
    this.draw('stalfos2');
  }
  if (this.carrying) {
    this.draw(this.carrying.toLowerCase());
  }
  game.engine.drawLight($('shadow-obstacle'), this.x, this.y+8,21,.5);
   
    
};


/**
 * What happens when the avatar touches us.
 * @param {ace.Runner} The game Runner.
 */
ace.Stalfos.prototype.onTouchAvatar = function(runner) {
  // Do the "usual" thing, in case we're a coin or something.
  if (this.standardOnTouchAvatar(runner)) return;

  // Otherwise, dose out some damage...
  runner.avatar.takeDamage(.5);
};

