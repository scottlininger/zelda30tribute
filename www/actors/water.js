/**
 * @fileoverview  Provide the Water class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Water class.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Water = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Water';
};
ace.inherits(ace.Water, ace.Obstacle);


/**
 * What to do every frame.
 * @param {ace.Runner} The game Runner.
 */
ace.Water.prototype.onTick = function(game) {
  // TODO(scott): Wait for ladder usage.
};
