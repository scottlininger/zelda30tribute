/**
 * @fileoverview  Provide the Trap class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Trap class.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Trap = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Trap';
  this.chargeSpeed = 8;
  this.retreatFactor = .25;
  this.hitHeight = 12;
  this.hitWidth = 12;
  this.state = 'WAITING';
  this.yChargeDistance = 2.5 * 16;
  this.xChargeDistance = 5 * 16;
  this.dx = 0;
  this.dy = 0;
};
ace.inherits(ace.Trap, ace.Actor);


/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.Trap.prototype.onTick = function(game) {
  
  this.x += this.dx;
  this.y += this.dy;
  this.draw('trap');
  game.engine.drawLight($('shadow-obstacle'), this.x, this.y,30,1);
  
  if (this.state == 'WAITING') {
    if (ace.diff(this.x, game.avatar.x) < 8) {
      this.state = 'CHARGING';
      if (game.avatar.y > this.y) {
        this.dy = this.chargeSpeed;
      } else {
        this.dy = -this.chargeSpeed;
      }
      this.totalFrames = this.yChargeDistance / this.chargeSpeed;
      this.frameCount = 0;
    } else if (ace.diff(this.y, game.avatar.y) < 8) {
      this.state = 'CHARGING';
      if (game.avatar.x > this.x) {
        this.dx = this.chargeSpeed;
      } else {
        this.dx = -this.chargeSpeed;
      }
      this.totalFrames = this.xChargeDistance / this.chargeSpeed;
      this.frameCount = 0;
    }
    return;
  }
  
  if (this.state == 'CHARGING') {
    this.frameCount++;
  	if (this.frameCount >= this.totalFrames) {
  	  this.dy = -this.dy * this.retreatFactor;
  	  this.dx = -this.dx * this.retreatFactor;
  	  this.state = 'RETREATING';
  	  this.frameCount = 0;
  	  this.totalFrames = this.totalFrames / this.retreatFactor;
  	}
  	
    return;
  }
  
  if (this.state == 'RETREATING') {
    this.frameCount++;
  	if (this.frameCount >= this.totalFrames) {
			this.dx = 0;
			this.dy = 0;
  	  this.state = 'WAITING';
  	}
  	
    return;
  }
};


/**
 * What happens when the avatar touches us.
 * @param {ace.Runner} The game Runner.
 */
ace.Trap.prototype.onTouchAvatar = function(runner) {
  runner.avatar.takeDamage(1);
};

