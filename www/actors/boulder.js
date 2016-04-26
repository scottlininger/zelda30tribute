/**
 * @fileoverview  Provide the Boulder (aka Zora) class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Boulder class, baddie who walks around and hurls rocks.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Boulder = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Boulder';
  this.rotX = -.5
  this.hitWidth = 8;
  this.hitHeight = 8;
  this.zOffset = 8;
  this.rotZ - 0;
  this.rotX2 = 0;
};
ace.inherits(ace.Boulder, ace.Enemy);


/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.Boulder.prototype.onTick = function(game) {
  if (this.standardDeathCheck(game)) return;

  this.y += this.dY;
  this.x += this.dX;
  
  if (this.y < this.baseY - 200) {
    this.y = this.baseY + ace.randomInt(32);
    this.x = this.baseX - 16 + ace.randomInt(32);
  }
  
  var bounceZ = Math.abs(Math.cos(this.y / 32)) * 8;
  if (bounceZ < .5) {
    if (Math.random() < .3) {
      this.dX *= -1;
    }
  }
  this.targetRotZ = this.dX / 8;
  this.rotZ = (this.rotZ * 3 + this.targetRotZ) / 4;
  
  var targetZ = game.getWorldZ(this.x, this.y) + bounceZ;
  this.z = (this.z * 3 + targetZ) / 4;
  this.draw('boulder');
  this.rotX2 += .6;
  
};


/**
 * Applies damage to my this.hitPoints value.
 * @param {number} damge The damage to apply.
 */
ace.Boulder.prototype.takeDamage = function(damage) {
  return false;
};



/**
 * What happens when we spawn.
 * @param {ace.Runner} The game Runner.
 */
ace.Boulder.prototype.onSpawn = function() {
  this.dX = 2;
  this.dY = -2;
  this.baseY = this.y + 64;
  this.baseX = this.x - 120;
  this.y = this.baseY + ace.randomInt(32);
  
  
};

/**
 * What happens when the avatar touches us.
 * @param {ace.Game} The game Runner.
 */
ace.Boulder.prototype.onTouchAvatar = function(game) {
  // Do the "usual" thing, in case we're a coin or something.
  if (this.standardOnTouchAvatar(game)) return;

  // Otherwise, dose out some damage...
  game.avatar.takeDamage(.5);
};
