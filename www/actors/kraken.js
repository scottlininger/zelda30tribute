/**
 * @fileoverview  Provide the Kraken (aka Zora) class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Kraken class, baddie who walks around and hurls rocks.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Kraken = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Kraken';
  this.rotX = -.5
  this.hitWidth = 16;
  this.hitHeight = 16;
  this.hitPoints = 2;
  
  this.state = 'EMERGING';
  this.stateCount = 0;
  this.emergingFrames = 30;
  this.emergedFrames = 40;
  this.submergedFrames = 10;
  this.zOffset = 0;

};
ace.inherits(ace.Kraken, ace.Enemy);


/**
 * What to do every frame.
 * @param {ace.Game} The game.
 */
ace.Kraken.prototype.onTick = function(game) {
  if (this.standardDeathCheck(game)) return;

  if (this.state == 'EMERGING') {  
    this.zOffset = -7;
    this.targetZOffset = -7;
    this.targetRotX = -Math.PI / 2;
    this.rotX2 = Math.random() / 4;
    
    this.draw('bubbles')
    
    this.stateCount++;
    if (this.stateCount == this.emergingFrames) {
      this.state = 'EMERGED';
      this.stateCount = 0;
    }
  }

  if (this.state == 'EMERGED') {
    this.targetZOffset = 0;
    this.targetRotX = -.5;
    this.draw('zora');
    this.rotX2 = 0;
    
    if (this.stateCount == 0) {
      // Shoot a fireball.
      var opts = {x: this.x, y: this.y - 8, z: this.z + 8};
      game.spawn('FireBall', opts);
    }
    
    this.stateCount++;
    if (this.stateCount == this.emergedFrames) {
      this.state = 'SUBMERGED';
      this.stateCount = 0;
    }
    
  }
  
  if (this.state == 'SUBMERGED') {
    this.targetZOffset = -17;
    this.targetRotX = -Math.PI / 2;
    this.draw('zora');
    this.rotX2 = 0;
    this.stateCount++;
    if (this.stateCount == this.submergedFrames) {
      this.state = 'EMERGING';
      this.stateCount = 0;
      this.onSpawn();
    }
  }
  
  
  this.rotX = (this.rotX * 5 + this.targetRotX) / 6;
  this.zOffset = (this.zOffset * 5 + this.targetZOffset) / 6;
  
  
};


/**
 * Applies damage to my this.hitPoints value.
 * @param {number} damge The damage to apply.
 */
ace.Kraken.prototype.takeDamage = function(damage) {
  
  if (this.state != 'EMERGED') {
    // Then we're underwater. Nothing happens.
    return false;
  }
  // retreat to water!
  this.state = 'SUBMERGED';
  this.stateCount = 0;
  this.hitPoints -= damage;

  if (this.flashesWhenHit == true) {
    this.invincibilityCounter = 10;
  }
  
  return true;
};



/**
 * What happens when we spawn.
 * @param {ace.Runner} The game Runner.
 */
ace.Kraken.prototype.onSpawn = function() {

  var hasFoundWater = false;
  
  while (hasFoundWater == false) {
    var baseX = Math.floor(this.x / ace.OVERWORLD_ROOM_PIXEL_WIDTH) * ace.OVERWORLD_ROOM_PIXEL_WIDTH;
    var baseY = Math.floor(this.y / ace.OVERWORLD_ROOM_PIXEL_HEIGHT) * ace.OVERWORLD_ROOM_PIXEL_HEIGHT;  
    this.x = baseX + 8 + 16 * ace.randomInt(ace.OVERWORLD_ROOM_PIXEL_WIDTH / 16 - 1);
		this.y = baseY + 5 + 16 * ace.randomInt(ace.OVERWORLD_ROOM_PIXEL_HEIGHT / 16 - 1);
		
    var tile = game.getTileAt(this.x, this.y);
    
    if (tile.name.indexOf('water') > -1 || tile.name == 'Kraken') {
      hasFoundWater = true;
    }
  }
  
};
