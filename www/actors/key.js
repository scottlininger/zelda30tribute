/**
 * @fileoverview  Provide the Key class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Key class.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Key = function(game, room) {
  ace.base(this, game, room);
  this.name = 'key';
  this.isEnemy = false;
  this.hasAppeared = false;
};
ace.inherits(ace.Key, ace.Enemy);


/**
 * What to do every frame.
 * @param {ace.Runner} The game Runner.
 */
ace.Key.prototype.onTick = function(game) {
  if (!this.hasAppeared) {
    this.hitPoints = ace.HITPOINTS_DEAD;
    this.hasAppeared = true;
  }

  if (this.hasAppeared) {
    this.standardDeathCheck(game);
  }
};


/**
 * What to do when touched by the avatar.
 * @param {ace.Game} The game.
 */
ace.Key.prototype.onTouchAvatar = function(game) {
  this.standardOnTouchAvatar(game);
};
