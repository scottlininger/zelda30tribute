/**
 * @fileoverview  Provide the Zol class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Zol class, baddie who walks around and hurls rocks.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Zol = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Zol';
  this.isEvenFrame = true;
  this.facing = ace.randomFacing();
  this.walkSpeed = 1;
  this.rotX = -.2;
  this.hitPoints = 2;
};
ace.inherits(ace.Zol, ace.Enemy);


/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.Zol.prototype.onTick = function(game) {
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
  	this.draw('zol1');
  } else {
    this.draw('zol2');
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
ace.Zol.prototype.onTouchAvatar = function(runner) {
  // Do the "usual" thing, in case we're a coin or something.
  if (this.standardOnTouchAvatar(runner)) return;

  // Otherwise, dose out some damage...
  runner.avatar.takeDamage(1);
};



/**
 * Applies damage to my this.hitPoints value.
 * @param {number} damge The damage to apply.
 */
ace.Zol.prototype.takeDamage = function(damage) {
  
  if (damage < 2) {
    this.hide();
    this.hitPoints = 0;
    var opts = {x: this.x+3, y: this.y, z: this.z, invincibilityCounter: 10};
    game.spawn('Gel', opts);
    game.playSound('hit');
    var opts = {x: this.x-3, y: this.y, z: this.z, invincibilityCounter: 10};
    game.spawn('Gel', opts);
  }
  
  return true;
};

