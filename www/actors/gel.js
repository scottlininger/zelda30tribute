/**
 * @fileoverview  Provide the Gel class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Gel class, baddie who walks around.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Gel = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Gel';
  this.isEvenFrame = true;
  this.facing = ace.randomFacing();
  this.walkSpeed = 4;
  this.rotX = -.4;
  this.hitPoints = 1;
  this.frameCount = 0;
  this.height = 16;
  this.width = 16;
  this.hitWidth = 16;
  this.hitHeight = 16;
  
  this.frameCount = Math.floor(16 / this.walkSpeed * 1.5);
};
ace.inherits(ace.Gel, ace.Enemy);


/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.Gel.prototype.onTick = function(game) {
  if (this.standardDeathCheck(game)) return;

  var dX = this.walkSpeed * ace.xMultByFacing[this.facing];
  var dY = this.walkSpeed * ace.yMultByFacing[this.facing];

	var steps = 16 / this.walkSpeed;
	if (this.frameCount < steps) {
	  this.x += dX;
		this.y += dY;
	} else if (this.frameCount < steps*2) {
	  // vibrate
	} else {
	  this.facing = ace.randomFacing();
	  dX = this.walkSpeed * ace.xMultByFacing[this.facing];
    dY = this.walkSpeed * ace.yMultByFacing[this.facing];
  
	  if (this.canWalk(dX * steps, dY * steps) && ace.randomInt(6) == 0) {
	    this.frameCount = -1;
	  }
	}

	this.frameCount++;


  /*
  if (game.isBlinkFrame) {
    this.isEvenFrame = !this.isEvenFrame;
  }
  */
  if (game.isEvenFrame) {
  	this.draw('gel1');
  } else {
    this.draw('gel2');
  }

  if (this.carrying) {
    this.draw(this.carrying.toLowerCase());
  }
  game.engine.drawLight($('shadow-obstacle'), this.x, this.y+4,15,.3);
    
};


/**
 * What happens when the avatar touches us.
 * @param {ace.Runner} The game Runner.
 */
ace.Gel.prototype.onTouchAvatar = function(runner) {
  // Do the "usual" thing, in case we're a coin or something.
  if (this.standardOnTouchAvatar(runner)) return;

  // Otherwise, dose out some damage...
  runner.avatar.takeDamage(.5);
};

