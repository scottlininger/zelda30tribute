/**
 * @fileoverview  Provide the FlyingBoomerang class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the FlyingBoomerang class.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.FlyingBoomerang = function(game, room) {
  ace.base(this, game, room);
  this.name = 'FlyingBoomerang';

  this.width = 16;
  this.height = 16;
  this.hitWidth = 16;
  this.hitHeight = 16;

	this.throwDistance = 16 * 5;
  this.boomerangFrames = 1;
  this.throwSpeed = 10;
  this.boomerangSpin = 1.5;
};
ace.inherits(ace.FlyingBoomerang, ace.Actor);


/**
 * What to do when we spawn.
 * @param {ace.Game} The game.
 */
ace.FlyingBoomerang.prototype.onSpawn = function(game) {
  this.dx = this.throwSpeed * ace.xMultByFacing[this.facing];
  this.dy = this.throwSpeed * ace.yMultByFacing[this.facing];
};


/**
 * What to do every frame.
 * @param {ace.Runner} The game Runner.
 */
ace.FlyingBoomerang.prototype.onTick = function(runner) {

  this.rotZ += this.boomerangSpin;
  this.draw('boomerangflat');
    
  game.engine.drawLight($('shadow-obstacle'), this.x, this.y, 12, .5);
      

  /*
  TODO(scott): test for strike.
  if (game.avatar.distance({x:this.boomerang.pos[0], y:this.boomerang.pos[1]})
      <= 12) {
    game.avatar.takeDamage(.5);
    this.boomerang.throwDistance =
        this.distance({x:this.boomerang.pos[0], y:this.boomerang.pos[1]});
  }
  */
    
  this.boomerangFrames++;
  var reversePoint = this.throwDistance / this.throwSpeed;
  if (this.boomerangFrames <= reversePoint) {
    this.x += this.dx;
    this.y += this.dy;
    // If we hit a wall, declare that our maximum throw distance.
    if (this.isOffScreen(this.x, this.y)) {
      this.throwDistance =
        this.distance({x:game.avatar.x, y: game.avatar.y});
    }
    
  } else {
    var vectorToAvatar = [
      this.x - game.avatar.x,
      this.y - game.avatar.y,
      0];
    vec3.normalize(vectorToAvatar, vectorToAvatar);

    this.x -= vectorToAvatar[0] * this.throwSpeed;
    this.y -= vectorToAvatar[1] * this.throwSpeed;
    
    if (this.distance({x:game.avatar.x, y: game.avatar.y}) < this.throwSpeed) {
      this.hide();
    }
  }

  
};
