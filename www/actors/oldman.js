/**
 * @fileoverview  Provide the OldMan class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the OldMan class, a simple, single-block OldMan.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.OldMan = function(game, room) {
  ace.base(this, game, room);
  this.name = 'OldMan';
  this.width = 16;
  this.height = 16;
  this.hitWidth = 16;
  this.hitHeight = 16;
  this.isWalkable = false;

	game.currentRoom_.cameraTargetOffset = [0,0,50];
  game.currentRoom_.cameraEyeOffset = [0,0,30];
};
ace.inherits(ace.OldMan, ace.Actor);


/**
 * What to do every frame.
 * @param {ace.Runner} The game Runner.
 */
ace.OldMan.prototype.onTick = function(game) {
  this.rotZ = this.angleTo(game.avatar.x, game.avatar.y);
  this.zOffset = 1 + Math.floor(this.rotZ * 30) % 2;
  this.draw(this.spriteName || 'oldman1');
  
  if (this.text1 && ace.diff(this.x, game.avatar.x) < 4 &&
                    ace.diff(this.y, game.avatar.y) < 40) {
    var opts = {x: this.x - 70, y: this.y + 6.5, text: this.text1, z: this.z};
		game.spawn('Text', opts);
		this.text1 = '';
  }
  

};


