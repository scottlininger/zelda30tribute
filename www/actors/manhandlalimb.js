/**
 * @fileoverview  Provide the ManhandlaLimb class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the ManhandlaLimb class.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.ManhandlaLimb = function(game, room) {
  ace.base(this, game, room);
  this.name = 'ManhandlaLimb';
  this.isOpen = true;
  this.hitPoints = 4;
};
ace.inherits(ace.ManhandlaLimb, ace.Enemy);


/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.ManhandlaLimb.prototype.onTick = function(game) {
  if (this.standardDeathCheck(game, true)) return;
  
  // There is a variable called manhandla which is a reference to the
  // main actor.
  
  if (ace.randomInt(10) == 1) {
    this.isOpen = !this.isOpen;
  }
  this.x = this.manhandla.x + ace.xMultByFacing[this.facing] * 16;
  this.y = this.manhandla.y + ace.yMultByFacing[this.facing] * 16;
  this.z = this.manhandla.z;
  this.rotZ = ace.getRotZByFacing(this.facing);

  if (this.isOpen) {
    this.draw('manhandla_open');
  } else {
    this.draw('manhandla_closed');
  }
  
  if (ace.randomInt(200) < 3) {
    // Shoot a fireball.
    var opts = {x: this.x, y: this.y, z: this.z};
    game.spawn('FireBall', opts);
  }
  game.engine.drawLight($('shadow-obstacle'), this.x, this.y+8,21,.5);
};


/**
 * What happens when the avatar touches us.
 * @param {ace.Runner} The game Runner.
 */
ace.ManhandlaLimb.prototype.onTouchAvatar = function(runner) {
  // Do the "usual" thing, in case we're a coin or something.
  if (this.standardOnTouchAvatar(runner)) return;

  // Otherwise, dose out some damage...
  runner.avatar.takeDamage(1);
};
