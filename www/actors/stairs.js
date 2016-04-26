/**
 * @fileoverview  Provide the Stairs class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Stairs class.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Stairs = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Stairs';
  this.width = 16;
  this.height = 16;
  this.hitWidth = 4;
  this.hitHeight = 4;
  this.teleportTo = [1864,100, 0];//[1864,134, -90];
};
ace.inherits(ace.Stairs, ace.Actor);


/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.Stairs.prototype.onTick = function(game) {
	// Hacky way to handle side scrolling rooms and needing to collide
	// with the avatar.
	if (this.z < -100) {
	  this.z = -996;
	}
};


/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.Stairs.prototype.onTouchAvatar = function(game) {
	game.avatar.x = this.teleportTo[0];
	game.avatar.y = this.teleportTo[1];
	game.avatar.z = this.teleportTo[2];
	if (this.teleportTo[3]) {
    game.changeDungeon(this.teleportTo[3]);
  } else {
    game.changeDungeon('1');
  }
  
	game.setCameraEye(game.avatar.x, game.avatar.y, game.avatar.z + 1);
	game.setCameraTarget(game.avatar.x, game.avatar.y, game.avatar.z);
};

