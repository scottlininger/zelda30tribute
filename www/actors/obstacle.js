/**
 * @fileoverview  Provide the Obstacle class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Obstacle class, a simple, single-block obstacle.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Obstacle = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Obstacle';
  this.width = 16;
  this.height = 16;
  this.hitWidth = 16;
  this.hitHeight = 16;
  this.isWalkable = false;
  this.castsShadows = true;
};
ace.inherits(ace.Obstacle, ace.Actor);


/**
 * What to do every frame.
 * @param {ace.Runner} The game Runner.
 */
ace.Obstacle.prototype.onTick = function(game) {
  if (this.faceAvatar == true) {
    this.rotZ = this.angleTo(game.avatar.x, game.avatar.y);
    this.zOffset = 1 + Math.floor(this.rotZ * 30) % 2;
  }
  this.draw(this.spriteName || 'oldman1');
  
  if (0 && this.castsShadows && this.spriteName.indexOf('block') == -1) {
		var dx = this.x - game.avatar.x;
		var dy = this.y - game.avatar.y;
		var d = Math.sqrt(dx * dx + dy * dy);
		
		//game.engine.drawLight($('shadow-obstacle'), this.x+(dx/2), this.y+(dy/2), 16 + d);
		//game.engine.drawLight($('shadow-obstacle'), this.x+(dx/2), this.y+(dy/2), 20 + d, 1 - (d / 128));
	
		game.engine.drawLight($('shadow-obstacle'), this.x+(dx/2), this.y+(dy/2), 20 + d, .5);
		d = d * 1.5
		game.engine.drawLight($('shadow-obstacle'), this.x+(dx), this.y+(dy), 20 + d, .5);
  }
};
