/**
 * @fileoverview  Provide the CaveExit class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the CaveExit class, which is the way we get the
 * avatar out of a cave or dungeon.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.CaveExit = function(game, room) {
  ace.base(this, game, room);
  this.name = 'CaveExit';
  this.width = 16;
  this.height = 16;
  this.hitWidth = 256;
  this.hitHeight = 4;
  this.teleportTo = [1864,100, 0];//[1864,134, -90];
};
ace.inherits(ace.CaveExit, ace.Actor);


/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.CaveExit.prototype.onTouchAvatar = function(game) {
  if (this.teleportToLastOverworldLocation == true) {
    game.avatar.x = game.state.lastOverworldLocation[0];
    game.avatar.y = game.state.lastOverworldLocation[1];
    game.avatar.z = game.state.lastOverworldLocation[2];
  } else {
    game.avatar.x = this.teleportTo[0];
    game.avatar.y = this.teleportTo[1];
    game.avatar.z = this.teleportTo[2];
  }
	
	game.setCameraEye(game.avatar.x, game.avatar.y, game.avatar.z + 1);
	game.setCameraTarget(game.avatar.x, game.avatar.y, game.avatar.z);
	
	game.avatar.isLeavingCave = true;
};

