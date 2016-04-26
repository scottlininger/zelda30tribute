/**
 * @fileoverview  Provide the Darknut class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Darknut class.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Darknut = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Darknut';
  this.isEvenFrame = true;
  this.facing = ace.randomFacing();
  this.walkSpeed = 1.5;
  this.rotX = -.4;
  this.hitPoints = 4;
};
ace.inherits(ace.Darknut, ace.Enemy);


/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.Darknut.prototype.onTick = function(game) {
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


  this.rotZ = ace.getRotZByFacing(this.facing);

  
  if (game.isBlinkFrame) {
    this.isEvenFrame = !this.isEvenFrame;
  }
  if (this.isEvenFrame) {
    this.zOffset = 0;
  	this.draw('darknut1');
  } else {
   this.zOffset = -1;
    this.draw('darknut2');
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
ace.Darknut.prototype.onTouchAvatar = function(runner) {
  // Do the "usual" thing, in case we're a coin or something.
  if (this.standardOnTouchAvatar(runner)) return;

  // Otherwise, dose out some damage...
  runner.avatar.takeDamage(1);
};


/**
 * Applies damage to my this.hitPoints value.
 * @param {number} damge The damage to apply.
 */
ace.Darknut.prototype.takeDamage = function(damage, opt_damageFacing) {
  
  if (this.cloudFrames || this.invincibilityCounter) {
    // Then we can't be hit yet.
    return false;
  }
  
  if (opt_damageFacing && this.facing == ace.oppositeFacings[opt_damageFacing]) {
    game.playSound('shield');
    return false;
  }
  // Face the enemy!
  if (opt_damageFacing) {
    this.facing = ace.oppositeFacings[opt_damageFacing];
  }
  this.hitPoints -= damage;
  var multX = ace.xMultByFacing[this.lastSwordHitFacing] || 0;
  var multY = ace.yMultByFacing[this.lastSwordHitFacing] || 0;
  this.knockbackTargetX = this.x + this.knockbackDistance * multX;
  this.knockbackTargetY = this.y + this.knockbackDistance * multY;
  this.knockbackFrames = 0;
  
  
  if (this.flashesWhenHit == true) {
    this.invincibilityCounter = 20;
  }
  
  return true;
};

