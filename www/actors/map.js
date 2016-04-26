/**
 * @fileoverview  Provide the Map class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Map class.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Map = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Map';
};
ace.inherits(ace.Map, ace.Actor);


/**
 * What to do every frame.
 * @param {ace.Runner} The game Runner.
 */
ace.Map.prototype.onTick = function(game) {
  this.draw('map');
  this.rotZ += .1;

  game.engine.drawLight($('light-lantern'), this.x, this.y, Math.random(50));

	if (this.isTouching(game.avatar)) {
    game.avatar.pickUp('map');
    this.hide();
  }
};
