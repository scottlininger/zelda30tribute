/**
 * @fileoverview  Provide the PushableBlock class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the PushableBlock class.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.PushableBlock = function(game, room) {
  ace.base(this, game, room);
  this.name = 'PushableBlock';
};
ace.inherits(ace.PushableBlock, ace.Obstacle);


/**
 * What to do every frame.
 * @param {ace.Runner} The game Runner.
 */
ace.PushableBlock.prototype.onTick = function(game) {
  if (this.type) {
    this.draw('block_' + this.type);
  } else {
    this.draw('block');
  }
  
  if (this.hasBeenPushed) {
    return;
  }
  
  var pushX = game.avatar.x + 8 * ace.xMultByFacing[game.avatar.facing];
  var pushY = game.avatar.y + 8 * ace.yMultByFacing[game.avatar.facing];
  
  if (this.distance(game.avatar) < 18 && this.isHitAt(pushX, pushY)) {
    if (!this.facing) {
      this.facing = game.avatar.facing;
      this.targetX = this.x + 16 * ace.xMultByFacing[game.avatar.facing];
      this.targetY = this.y + 16 * ace.yMultByFacing[game.avatar.facing];
    }
    if (game.avatar.facing == this.facing) {
      this.x += 2 * ace.xMultByFacing[game.avatar.facing];
      this.y += 2 * ace.yMultByFacing[game.avatar.facing];
    }
    if (ace.distance(this.x - this.targetX, this.y - this.targetY) < .2) {
      this.x = this.targetX;
      this.y = this.targetY;
      this.hasBeenPushed = true;
      game.playSound('secret');
    }
  }
  
};
