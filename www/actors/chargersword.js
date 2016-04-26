
/**
 * @fileoverview  Provide the ChargerSword class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the ChargerSword class, the thing Chargers shoot.
 * @constructor
 * @extends {ace.HurlerRock}
 */
ace.ChargerSword = function(game, room) {
  ace.base(this, game, room);
  this.name = 'ChargerSword';


  this.facing = 'down';
  this.damage = 2;
  this.speed = 12;
  this.reflectingFrame = 0;
};
ace.inherits(ace.ChargerSword, ace.HurlerRock);


/**
 * What to do when we first appear.
 * @param {ace.Runner} The game Runner.
 */
ace.ChargerSword.prototype.onTick = function(runner) {

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

  if (this.reflectingFrame > 0) {
    this.draw('whitesword');
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

  this.rotZ = ace.getRotZByFacing(
      ace.counterClockwiseByFacing[this.facing]) - Math.PI / 2;
  
  if (runner.isEvenFrame) {
    this.draw('whitesword');
  } else {
    this.draw('woodensword');
  }
  
  
    
};
