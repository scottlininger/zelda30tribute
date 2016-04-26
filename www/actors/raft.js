/**
 * @fileoverview  Provide the Raft class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Raft class, a simple, single-block Raft.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Raft = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Raft';
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
ace.inherits(ace.Raft, ace.Actor);


/**
 * What to do every frame.
 * @param {ace.Runner} The game Runner.
 */
ace.Raft.prototype.onTick = function(game) {

  if (game.currentRoom_.isSideScroll) {
    this.z = -984-16;
  }
  this.draw('raft');
  this.rotZ += .1;

  //game.engine.drawLight($('light-lantern'), this.x, this.y, Math.random(200));
	//game.engine.drawLight($('light-star'), this.x, this.y, 50, .5, this.rotZ / 2);

	if (this.isTouching(game.avatar)) {
    game.avatar.pickUp('raft');
    this.hide();
  }
};
