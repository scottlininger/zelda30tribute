/**
 * @fileoverview  Provide the TriforcePiece class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the TriforcePiece class, a simple, single-block TriforcePiece.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.TriforcePiece = function(game, room) {
  ace.base(this, game, room);
  this.name = 'TriforcePiece';
  this.width = 16;
  this.height = 16;
  this.hitWidth = 16;
  this.hitHeight = 16;
  this.isWalkable = true;
  this.castsShadows = true;
  this.zOffset = 10;
};
ace.inherits(ace.TriforcePiece, ace.Actor);


/**
 * What to do every frame.
 * @param {ace.Runner} The game Runner.
 */
ace.TriforcePiece.prototype.onTick = function(game) {
  this.draw('triforcepiece');
  if (game.isBlinkFrame) {
    this.rotZ += Math.PI;
  }
  this.rotZ += .1;

  //game.engine.drawLight($('light-lantern'), this.x, this.y, Math.random(200));
	game.engine.drawLight($('light-star'), this.x, this.y, 100, 1, this.rotZ / 2);

	if (this.isTouching(game.avatar)) {
    game.avatar.pickUp('triforcepiece', this.teleportTo);
    this.hide();
  }
};
