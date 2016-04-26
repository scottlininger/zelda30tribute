/**
 * @fileoverview  Provide the Compass class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Compass class.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Compass = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Compass';
  this.rotX = -.3;
};
ace.inherits(ace.Compass, ace.Actor);


/**
 * What to do every frame.
 * @param {ace.Runner} The game Runner.
 */
ace.Compass.prototype.onTick = function(game) {
  this.draw('compass');
  this.rotZ += .1;

	game.engine.drawLight($('light-lantern'), this.x, this.y, 30);

	if (this.isTouching(game.avatar)) {
    game.avatar.pickUp('compass');
    this.hide();
  }
};
