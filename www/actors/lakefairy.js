/**
 * @fileoverview  Provide the LakeFairy class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the LakeFairy class, a simple, single-block LakeFairy.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.LakeFairy = function(game, room) {
  ace.base(this, game, room);
  this.name = 'LakeFairy';
  this.width = 16;
  this.height = 16;
  this.hitWidth = 16;
  this.hitHeight = 16;
  this.isWalkable = true;

  this.heartDistance = 0;
  this.targetHeartDistance = 55;
  this.state = 'WAITING';
};
ace.inherits(ace.LakeFairy, ace.Actor);


/**
 * What to do every frame.
 * @param {ace.Runner} The game Runner.
 */
ace.LakeFairy.prototype.onTick = function(game) {
  this.rotZ = (Math.cos(game.tickCount / 10)) / 3;
  this.zOffset = Math.cos(game.tickCount / 10) * 3;
  
  // Draw the hearts.
  var totalHearts = 8;
  var angle = game.tickCount / 15;
  var cx = this.x + 8;
  var cy = this.y - 16;
  for (var i = 0; i < totalHearts; i++) {
    var heartAngle = angle + i * (Math.PI * 2 / totalHearts);
    var x = cx + Math.cos(heartAngle) * this.heartDistance;
    var y = cy + Math.sin(heartAngle) * this.heartDistance;
    this.draw('heart', [x, y, this.z + 12]);
  }
  
  if (game.isBlinkFrame) {
    this.draw('fairy', [this.x+8, this.y-8, this.z + 8]);
  } else {
    this.draw('fairy2', [this.x+8, this.y-8, this.z + 8]);
  }
  
  game.engine.drawLight($('light-star'), this.x + 8, this.y - 8, this.heartDistance * 3, .5, angle / 2);

  if (this.state == 'WAITING' && ace.diff(this.x, game.avatar.x) < 20 &&
      ace.diff(this.y, game.avatar.y) < 50) {
    this.state = 'HEALING';
  }
  if (this.state == 'HEALING') {
    if (game.isBlinkFrame) {
      if (game.avatar.hitPoints < game.avatar.maxHitPoints) {
        game.avatar.changeHitPoints(.5);
      } else {
        this.state = 'DISAPPEARING';
      }
    }
  }
  if (this.state == 'DISAPPEARING') {
    this.heartDistance = this.heartDistance * .8;
    this.fall = this.fall || 0;
    this.fall += .1;
    this.z -= this.fall;
    if (this.z < -32) {
      this.hide();
    }
  } else {
    this.heartDistance = (this.heartDistance * 3 + this.targetHeartDistance) / 4;
  }

};


