/**
 * @fileoverview  Provide the BombHole class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the BombHole class.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.BombHole = function(game, room) {
  ace.base(this, game, room);
  this.name = 'BombHole';
  this.bottomSprite = 'bombhole';
  this.topSprite = 'bombhole';
  this.isWalkable = false;
  this.maxHitPoints = 4;
  this.hitPoints = 4;
  
  this.dFactor = 5;
  //this.dz = -.1;
};
ace.inherits(ace.BombHole, ace.LockedDoor);



/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.BombHole.prototype.onTick = function(game) {
  if (this.isWalkable) {
    var offsetX = this.dx / this.dFactor;
    var offsetY = this.dy / this.dFactor;
    this.draw(this.bottomSprite,
        [this.x - offsetX, this.y - offsetY, this.z]);
    this.draw(this.topSprite, [this.x - offsetX + this.dx*.4, this.y - offsetY + this.dy*.4, this.z + this.dz*.4]);
    game.engine.drawLight($('light-lantern'), this.x - this.dx, this.y - this.dy,50);
  }
  
  if (this.distance(game.avatar) < 18 &&
      game.avatar.facing == this.facing) {
    this.isWalkable = true;
  }
  
};


/**
 * Handles Damage. The theory is that bombs are the only things
 * that do enough to blow up a door.
 * @param {ace.Game} The game.
 */
ace.BombHole.prototype.takeDamage = function(damage) {
  this.hitPoints -= damage;
  if (this.hitPoints <= 0) {
    this.isWalkable = true;
    return true;
  } else {
    this.hitPoints = this.maxHitPoints;
    return false;
  }
};

