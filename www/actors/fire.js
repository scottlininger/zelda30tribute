/**
 * @fileoverview  Provide the Fire class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Fire class.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Fire = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Fire';
  this.width = 16;
  this.height = 16;
  this.hitWidth = 16;
  this.hitHeight = 16;
};
ace.inherits(ace.Fire, ace.Actor);


/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.Fire.prototype.onTick = function(game) {
  this.draw('fire');
  if (game.isEvenFrame) {
    this.rotZ +=  Math.PI;
  }
  game.engine.drawLight($('light-fire'), this.x, this.y,200 + ace.randomInt(60));
};




/**
 * What happens when the avatar touches us.
 * @param {ace.Game} The game.
 */
ace.Fire.prototype.onTouchAvatar = function(game) {
  game.avatar.takeDamage(3);
};