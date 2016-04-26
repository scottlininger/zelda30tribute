/**
 * @fileoverview  Provide the RaftLaunch class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the RaftLaunch class.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.RaftLaunch = function(game, room) {
  ace.base(this, game, room);
  this.name = 'RaftLaunch';
  this.width = 16;
  this.height = 16;
  this.hitWidth = 16;
  this.hitHeight = 16;
  this.isWalkable = false;
};
ace.inherits(ace.RaftLaunch, ace.Actor);


/**
 * What to do when we spawn.
 * @param {ace.Runner} The game Runner.
 */
ace.RaftLaunch.prototype.onSpawn = function() {
  if (game.avatar.hasInventory('raft')) {
    this.isWalkable = true;
  }
};

/**
 * What to do when the avatar touches us.
 * @param {ace.Runner} The game Runner.
 */
ace.RaftLaunch.prototype.onTouchAvatar = function(game) {
  console.log(this.distance(game.avatar));
  if (game.avatar.hasInventory('raft') && this.distance(game.avatar) < 10) {
    game.avatar.takeRaft(game.avatar.facing);
  }
};


