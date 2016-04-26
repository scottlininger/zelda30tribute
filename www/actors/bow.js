/**
 * @fileoverview  Provide the Bow class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Bow class, a simple, single-block Bow.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Bow = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Bow';
  this.width = 16;
  this.height = 16;
  this.hitWidth = 16;
  this.hitHeight = 16;
  this.isWalkable = true;
  this.castsShadows = true;
  this.zOffset = 10;
  this.rotX = -1.6;
  this.yOffset = -8;
};
ace.inherits(ace.Bow, ace.Actor);


/**
 * What to do every frame.
 * @param {ace.Runner} The game Runner.
 */
ace.Bow.prototype.onTick = function(game) {

  if (game.currentRoom_.isSideScroll) {
    this.z = -984-16;
  }
  this.draw('bow');
  this.rotZ += .1;

  //game.engine.drawLight($('light-lantern'), this.x, this.y, Math.random(200));
	//game.engine.drawLight($('light-star'), this.x, this.y, 50, .5, this.rotZ / 2);

	if (this.isTouching(game.avatar)) {
    game.avatar.pickUp('bow');
    this.hide();
  }
};
