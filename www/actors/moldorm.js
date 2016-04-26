/**
 * @fileoverview  Provide the Moldorm class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Moldorm class.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Moldorm = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Moldorm';
  this.hitPoints = 3;
  
  // An array of arrays. Each sub-array represents one of the
  // 3d locations of the Moldorm's segments.
  this.segments = [];
  this.maxSegments = 4;
  this.positionsBetweenSegments = 5;
  
  this.rotX = -.4;
  this.rotZ = Math.PI;
  this.speed = 2;
  
  this.direction = Math.PI / 4;
};
ace.inherits(ace.Moldorm, ace.Enemy);


/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.Moldorm.prototype.onTick = function(game) {
  if (this.standardDeathCheck(game)) return;
  
  if (ace.randomInt(100) < 5) {
    if (ace.randomInt(100) < 50) {
      this.direction += Math.PI / 2;
    } else {
      this.direction -= Math.PI / 2;
    }
  }
  
  var dX = Math.cos(this.direction) * this.speed;
  var dY = Math.sin(this.direction) * this.speed;
  
  this.lastX = this.x;
  this.lastY = this.y;
  
  this.x = this.x + dX;
  this.y = this.y + dY;
  if (this.isOffScreen()) {
    this.x = this.lastX;
    this.y = this.lastY;
  
    if (ace.randomInt(100) < 50) {
      this.direction += Math.PI / 2;
    } else {
      this.direction -= Math.PI / 2;
    }
    
  }

  // TODO(scott): This is not at all how the Moldorm
  // behaves, but I wanted to just see how one might
  // draw five sprites in an order.
  for (var i = (this.maxSegments * this.positionsBetweenSegments) - 1; i >= 0; i--) {
    
    if (i == 0) {
      this.segments[0] = [this.x, this.y, this.z];
    } else {
      this.segments[i] = this.segments[i - 1];
    }
    
    var segment = this.segments[i];
    if (segment && (i % this.positionsBetweenSegments) == 0) {
      this.draw('fireball', segment);
      game.engine.drawLight($('light-fire'), segment[0], segment[1], ace.randomInt(50));
    }
  }
	
};


/**
 * What happens when the avatar touches us.
 * @param {ace.Runner} The game Runner.
 */
ace.Moldorm.prototype.onTouchAvatar = function(runner) {
  // Do the "usual" thing, in case we're a coin or something.
  if (this.standardOnTouchAvatar(runner)) return;

  // Otherwise, dose out some damage...
  runner.avatar.takeDamage(.5);
};


/**
 * Applies damage to my this.hitPoints value.
 * @param {number} damge The damage to apply.
 */
ace.Moldorm.prototype.takeDamage = function(damage) {

  this.maxSegments -= 1;
  this.hitPoints = this.maxSegments;

  if (this.flashesWhenHit == true) {
    this.invincibilityCounter = 10;
  }
  
  return true;
};
