
/**
 * @fileoverview  Provide the HurlerRock class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the HurlerRock class, the thing Hurlers hurl.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.HurlerRock = function(game, room) {
  ace.base(this, game, room);
  this.name = 'HurlerRock';

  this.width = 80;
  this.height = 80;
  this.hitWidth = 36;
  this.hitHeight = 36;
  this.facing = 'down';

  // Which frame should be shown in the map editor.
  this.editorFrame = 'down';

  this.damage = .5;
  this.speed = 10;
  this.reflectingFrame = 0;
};
ace.inherits(ace.HurlerRock, ace.Enemy);


/**
 * What to do when we first appear.
 * @param {ace.Runner} The game Runner.
 */
ace.HurlerRock.prototype.onSpawn = function(runner) {
  
};


/**
 * What to do every frame.
 * @param {ace.Runner} The game Runner.
 */
ace.HurlerRock.prototype.onTick = function(runner) {
  var dX = this.speed * ace.xMultByFacing[this.facing];
  var dY = this.speed * ace.yMultByFacing[this.facing];

  if (this.reflectingFrame > 0) {
    if (dX == 0) {
      dY *= -1;
      dX = dY;
    } else {
      dX *= -1;
      dY = dX;
    }
    this.reflectingFrame--;
    if (this.reflectingFrame == 0) {
      this.hide();
      return;
    }
  }

  this.x += dX;
  this.y += dY;
  this.rotZ += .3;

  if (this.reflectingFrame > 0) {
    this.draw();
    return;
  }
  
  // Look at avatar to see if we hit it.
  if (this.isTouching(runner.avatar)) {
    if (game.avatar.shieldIsUp(this.facing)) {
      game.playSound('shield');
      this.reflectingFrame = 5;
    } else {
      game.avatar.takeDamage(this.damage);
      this.hide();
    }
  }
  
  // Hide ourself if we go off screen.
  if (this.isOffScreen()) {
    this.hide();
  }

	// This silliness corrects for a rotated arrow sprite.
	if (this.name == 'ArcherArrow') {
    this.rotZ = ace.getRotZByFacing(
        ace.counterClockwiseByFacing[this.facing]);
  }
  this.draw();
};
