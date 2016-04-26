/**
 * @fileoverview  Provide the FireBall class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the FireBall class.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.FireBall = function(game, room) {
  ace.base(this, game, room);
  this.name = 'FireBall';

  this.hitWidth = 8;
  this.hitHeight = 8;
  this.facing = 'down';
  this.rotX = -.4;
  this.moveSpeed = 4;
};
ace.inherits(ace.FireBall, ace.Actor);



/**
 * What to do every frame.
 * @param {ace.Game} The game Runner.
 */
ace.FireBall.prototype.onSpawn = function(game) {

  var angle = this.angleTo(game.avatar.x, game.avatar.y);
  this.dX = Math.sin(angle) * this.moveSpeed;
  this.dY = -Math.cos(angle) * this.moveSpeed;
};


/**
 * What to do every frame.
 * @param {ace.Runner} The game Runner.
 */
ace.FireBall.prototype.onTick = function(runner) {

  this.x += this.dX;
  this.y += this.dY;

  // Now render the glow into the light map.
  if (this.isInUnderworld()) {
    game.engine.drawLight($('light-fire'), this.x, this.y, 51);
  }
  
  if (runner.isEvenFrame) {
    this.rotZ = Math.PI;
    this.draw('fireball');
  } else {
    this.rotZ = 0;
    this.draw('fireball');
  }
 
};



/**
 * What happens when the avatar touches us.
 * @param {ace.Runner} The game Runner.
 */
ace.FireBall.prototype.onTouchAvatar = function(game) {
  game.avatar.takeDamage(.5);
};
