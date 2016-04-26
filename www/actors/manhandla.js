/**
 * @fileoverview  Provide the Manhandla class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Manhandla class.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Manhandla = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Manhandla';
  this.isOpen = true;
  game.currentRoom_.cameraTargetOffset = game.currentRoom_.cameraEyeOffset = [0,-30,60];
  this.speed = 2;
  this.direction = Math.PI / 4;
  this.hitPoints = 12;
};
ace.inherits(ace.Manhandla, ace.Enemy);


/**
 * What to do when we spawn.
 * @param {ace.Game} The game.
 */
ace.Manhandla.prototype.onSpawn = function(game) {

};


/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.Manhandla.prototype.onTick = function(game) {
  if (this.standardDeathCheck(game, true)) return;
  
  if (!this.limb1) {
    this.limb1 = game.spawn('ManhandlaLimb', {facing: 'right', manhandla: this});
    this.limb2 = game.spawn('ManhandlaLimb', {facing: 'up', manhandla: this});
    this.limb3 = game.spawn('ManhandlaLimb', {facing: 'down', manhandla: this});
    this.limb4 = game.spawn('ManhandlaLimb', {facing: 'left', manhandla: this});
  }
  

  this.totalDeadLimbs = (this.limb1.isAlive() ? 0 : 1) +
                        (this.limb2.isAlive() ? 0 : 1) +
                        (this.limb3.isAlive() ? 0 : 1) +
                        (this.limb4.isAlive() ? 0 : 1);
  this.speed = 2 + this.totalDeadLimbs;
  this.hitPoints = 4 - this.totalDeadLimbs;
 
  if (ace.randomInt(100) < 5) {
    if (ace.randomInt(100) < 50) {
      this.direction += Math.PI / 2;
    } else {
      this.direction -= Math.PI / 2;
    }
  }
  
  var dX = Math.cos(this.direction) * this.speed;
  var dY = Math.sin(this.direction) * this.speed;
  
  this.lastX = this.x;
  this.lastY = this.y;
  this.z = -1000 + Math.cos(game.tickCount / 4) * 6;
  
  this.x = this.x + dX;
  this.y = this.y + dY;
  if (this.isOffScreen()) {
    this.x = this.lastX;
    this.y = this.lastY;
  
    if (ace.randomInt(100) < 50) {
      this.direction += Math.PI / 2;
    } else {
      this.direction -= Math.PI / 2;
    }
  }
  
  this.draw('manhandla_center');
  game.engine.drawLight($('shadow-obstacle'), this.x, this.y+8,34,.6);
};



/**
 * What to do when we take damage.
 * @param {ace.Game} The game.
 */
ace.Manhandla.prototype.takeDamage = function(game) {
  this.knockbackDistance = 8;
  var multX = ace.xMultByFacing[this.lastSwordHitFacing] || 0;
  var multY = ace.yMultByFacing[this.lastSwordHitFacing] || 0;
  this.knockbackTargetX = this.x + this.knockbackDistance * multX;
  this.knockbackTargetY = this.y + this.knockbackDistance * multY;
  this.knockbackFrames = 0;
  
  if (this.flashesWhenHit == true) {
    this.invincibilityCounter = 10;
  }
  this.hitPoints = 4 - this.totalDeadLimbs;
  
  return true;
}