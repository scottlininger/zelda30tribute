/**
 * @fileoverview  Provide the Peahat class.
 * @author scott@scottlininger.com (Scott Lininger)
 */


/**
 * Constructor for the Peahat class, the guy who walks around the map.
 * @constructor
 * @extends {ace.BaseClass}
 */
ace.Peahat = function(game, room) {
  ace.base(this, game, room);
  this.name = 'Peahat';
  this.stopPausePercentChance = 3;
  this.cloudFrames = 1;
};
ace.inherits(ace.Peahat, ace.Enemy);


/**
 * What to do every frame.
 * @param {ace.Runner} The game Runner.
 */
ace.Peahat.prototype.onTick = function(runner) {
  if (this.standardCloudSpawnCheck()) return;
  if (this.standardDeathCheck(runner)) return;
  
  if (this.completion < 1) {
    this.completion += this.completionIncrement;
  } else {
    this.completion = 1;
  }
  var howFarAlong = (1 + Math.sin(-Math.PI/2 + Math.PI * this.completion)) / 2;
  var spinSpeed = Math.sin(Math.PI * this.completion) * .8;
  this.rotZ += spinSpeed * this.spinDirection;
  this.x = this.startX + howFarAlong * this.dX;
  this.y = this.startY + howFarAlong * this.dY;
  
  // TODO: When we get the shadows working, we can increase Z.
  // this.z = Math.sin(Math.PI * this.completion) * 16;
  // game.engine.drawLight($('shadow-round'), this.x, this.y,10);
  
  this.draw();
  
  if (this.completion >= 1 &&
      ace.randomInt(100) < this.stopPausePercentChance) {
    this.setTarget();
  }
  
};


/**
 * What happens when the avatar touches us.
 * @param {ace.Game} The game Runner.
 */
ace.Peahat.prototype.onTouchAvatar = function(game) {
  // Do the "usual" thing, in case we're a coin or something.
  if (this.standardOnTouchAvatar(game)) return;

  // Otherwise, dose out some damage...
  game.avatar.takeDamage(.5);
};



/**
 * What happens when this guy is spawned.
 * @param {ace.Game} The runner object.
 */
ace.Peahat.prototype.onSpawn = function(game) {
  this.baseX = Math.floor(this.x / ace.OVERWORLD_ROOM_PIXEL_WIDTH) * ace.OVERWORLD_ROOM_PIXEL_WIDTH;
  this.baseY = Math.floor(this.y / ace.OVERWORLD_ROOM_PIXEL_HEIGHT) * ace.OVERWORLD_ROOM_PIXEL_HEIGHT;    
  this.setTarget(game);
};


/**
 * Change our target.
 * @param {ace.Game} The runner object.
 */
ace.Peahat.prototype.setTarget = function(game) {
  var foundGoodSpot = false;
  while(foundGoodSpot == false) {

    this.completion = 0;    
		this.targetX = this.baseX + 8 + 16 * ace.randomInt(ace.OVERWORLD_ROOM_PIXEL_WIDTH / 16 - 1);
		this.targetY = this.baseY + 8 + 16 * ace.randomInt(ace.OVERWORLD_ROOM_PIXEL_HEIGHT / 16 - 1);
		
		var distance = this.distance({x: this.targetX, y: this.targetY});
		this.startX = this.x;
		this.startY = this.y;
		this.completionIncrement = .01;
	  this.spinDirection = ace.randomInt(100) < 50 ? 1 : -1;
	
		this.dX = this.targetX - this.x;
		this.dY = this.targetY - this.y;
		
		if (this.canWalk(this.dX, this.dY) && distance > 32) {
		  foundGoodSpot = true;
		}
  }
};


/**
 * Applies damage to my this.hitPoints value.
 * @param {number} damage The damage to apply.
 * @return {boolean} Whether the damage was "applied" by the enemy.
 *     Some enemies don't get hurt in certain states.
 */
ace.Peahat.prototype.takeDamage = function(damage) {
  if (this.cloudFrames) {
    // Then we can't be hit yet.
    return false;
  }
  
  // If we're spinning, then we can't be hit.
  if (this.completion < 1) {
    return false;
  }
  
  
  this.hitPoints -= damage;
  var multX = ace.xMultByFacing[this.lastSwordHitFacing];
  var multY = ace.yMultByFacing[this.lastSwordHitFacing];
  this.knockbackTargetX = this.x + this.knockbackDistance * multX;
  this.knockbackTargetY = this.y + this.knockbackDistance * multY;
  this.knockbackFrames = 0;
  return true;
};