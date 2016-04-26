/**
 * @fileoverview  Provide the Boomerang class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Boomerang class.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Boomerang = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Boomerang';
  this.width = 16;
  this.height = 16;
  this.hitWidth = 16;
  this.hitHeight = 16;
  this.isWalkable = true;
  this.zOffset = 6;
};
ace.inherits(ace.Boomerang, ace.Actor);


/**
 * What to do every frame.
 * @param {ace.Runner} The game Runner.
 */
ace.Boomerang.prototype.onTick = function(game) {
  if (!this.hasAppeared && game.allEnemiesAreDead()) {
    this.hasAppeared = true;
    game.playSound('key');
  }
  
  if (this.hasAppeared) {
    this.draw('boomerang');
		this.rotZ += .1;
	
		game.engine.drawLight($('light-lantern'), this.x, this.y, 50);
	
		if (this.isTouching(game.avatar)) {
			game.avatar.pickUp('boomerang');
			this.hide();
		}
  }
  
  
};
