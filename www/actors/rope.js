/**
 * @fileoverview  Provide the Rope class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Rope class, baddie who walks around and hurls rocks.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Rope = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Rope';
  this.isEvenFrame = true;
  this.facing = ace.randomFacing();
  this.walkSpeed = 1.5;
  this.chargeSpeed = 6;
  this.rotX = -.4;
  this.hitPoints = .5;
  this.state = 'WALKING';
  this.hitWidth = 16;
  this.hitHeight = 16;
};
ace.inherits(ace.Rope, ace.Enemy);


/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.Rope.prototype.onTick = function(game) {
  if (this.standardDeathCheck(game)) return;
  
  if (this.state == 'WALKING') {
    // We're walking. There's a small chance we'll change directions.
    if (ace.randomInt(100) < 2) {
      this.facing = ace.randomFacing();
    }
    
    var dX = this.walkSpeed * ace.xMultByFacing[this.facing];
    var dY = this.walkSpeed * ace.yMultByFacing[this.facing];
    
    var avatarDX = this.x - game.avatar.x;
    var avatarDY = this.y - game.avatar.y;
    
    // If we line up with avatar, charge!
    if ((this.facing == 'left'  && Math.abs(avatarDY) < 8 && avatarDX > 0) ||
        (this.facing == 'right' && Math.abs(avatarDY) < 8 && avatarDX < 0) ||
        (this.facing == 'up'    && Math.abs(avatarDX) < 8 && avatarDY < 0) ||
        (this.facing == 'down'  && Math.abs(avatarDX) < 8 && avatarDY > 0)) {
      this.state = 'CHARGING';
    }
  }
  
  if (this.state == 'CHARGING') {
    var dX = this.chargeSpeed * ace.xMultByFacing[this.facing];
    var dY = this.chargeSpeed * ace.yMultByFacing[this.facing];
  }
  
	if (this.canWalk(dX, dY)) {
		this.x += dX;
		this.y += dY;
	} else {
		this.facing = ace.randomFacing();
		this.state = 'WALKING';
	}

  // Though we keep track of facing for purposes of movement,
  // these Ropes only are rendered facing left or right.
  if (this.facing == 'left' || this.facing == 'down') {
    this.rotZ = ace.getRotZByFacing('left');
  } else if (this.facing == 'right' || this.facing == 'up') {
    this.rotZ = ace.getRotZByFacing('right');
  }
  
  if (game.isBlinkFrame) {
    this.isEvenFrame = !this.isEvenFrame;
  }
  if (this.isEvenFrame) {
  	this.draw('rope1');
  } else {
    this.draw('rope2');
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
ace.Rope.prototype.onTouchAvatar = function(runner) {
  // Do the "usual" thing, in case we're a coin or something.
  if (this.standardOnTouchAvatar(runner)) return;

  // Otherwise, dose out some damage...
  runner.avatar.takeDamage(.5);
  this.state = 'WALKING';
};

